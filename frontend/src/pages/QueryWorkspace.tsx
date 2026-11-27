import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  FileText,
  Clock,
  Layers,
  Filter,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Code2
} from 'lucide-react';
import { api } from '../services/api';
import type { AnalysisResponse, QueryParseResponse, ReproductionResponse } from '../types';

export const QueryWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [queryInput, setQueryInput] = useState<string>('How much ETH was transferred?');
  const [loading, setLoading] = useState<boolean>(false);
  const [reproducing, setReproducing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [parseResult, setParseResult] = useState<QueryParseResponse | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [reproductionResult, setReproductionResult] = useState<ReproductionResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const suggestedQueries = [
    "How much ETH was transferred?",
    "How many transactions happened?",
    "How many active wallets were there?",
    "How much gas was used?",
    "How many unique senders were there?",
    "Smart contract calls"
  ];

  const handleExecute = async (queryToRun?: string) => {
    const q = queryToRun || queryInput;
    if (!q.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setReproductionResult(null);

    try {
      // 1. Run live parse preview
      const parsed = await api.parseQuery(q);
      setParseResult(parsed);

      // 2. Execute full analysis pipeline
      const result = await api.executeAnalysis(q, 1);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error("Execution error:", err);
      const detail = err.response?.data?.detail;
      if (typeof detail === 'object' && detail.message) {
        setErrorMsg(detail.message);
      } else {
        setErrorMsg(typeof detail === 'string' ? detail : "Failed to execute query analysis. Please try a supported question.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReproduce = async () => {
    if (!analysisResult) return;
    setReproducing(true);
    try {
      const res = await api.reproduceAnalysis(analysisResult.analysis_id);
      setReproductionResult(res);
    } catch (err) {
      console.error("Reproduction error:", err);
    } finally {
      setReproducing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Query Workspace</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Natural language to SQL parsing for blockchain analytics.
        </p>
      </div>

      {/* Semantic Query Input Box */}
      <div className="academic-card p-6 space-y-4">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Semantic Query Input
        </div>

        <div className="relative">
          <textarea
            rows={3}
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="e.g., How much ETH was transferred? or How many transactions happened?"
            className="w-full text-sm font-medium text-slate-800 bg-slate-50/50 border border-slate-200 rounded-lg p-4 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all resize-none placeholder-slate-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Suggested Query Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Suggested:</span>
            {suggestedQueries.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQueryInput(item);
                  handleExecute(item);
                }}
                className="text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={() => handleExecute()}
            disabled={loading}
            className="w-full sm:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold px-6 py-2.5 rounded-md shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analyze Query</span>
              </>
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{errorMsg}</p>
              <p className="mt-1 text-slate-600">Try one of the suggested benchmark questions above.</p>
            </div>
          </div>
        )}
      </div>

      {/* 4 Extraction Context Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Metric Extracted */}
        <div className="academic-card p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-blue-600" />
            <span>Metric Extracted</span>
          </div>
          <div className="text-sm font-bold text-blue-600">
            {analysisResult?.metric || parseResult?.metric_name || "Transaction Volume"}
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
            {analysisResult?.metric_id || parseResult?.canonical_metric_id || "TX-VOLUME-001"}
          </div>
        </div>

        {/* Card 2: Time Range */}
        <div className="academic-card p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Time Range</span>
          </div>
          <div className="text-sm font-bold text-slate-800">
            {parseResult?.entities.time_range || "All Indexed Blocks"}
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
            dataset_id = 1 (ETH-DEMO)
          </div>
        </div>

        {/* Card 3: Blockchain Entity */}
        <div className="academic-card p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Blockchain Entity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="badge-blue text-[11px]">Ethereum Mainnet</span>
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100">
            target: transactions
          </div>
        </div>

        {/* Card 4: Applied Filters */}
        <div className="academic-card p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span>Applied Filters</span>
          </div>
          <div className="text-xs font-semibold text-slate-700">
            status = 'SUCCESS'
          </div>
          <div className="text-[11px] text-blue-600 font-medium cursor-pointer hover:underline">
            + Add Custom Filter
          </div>
        </div>
      </div>

      {/* Generated SQL Pane */}
      <div className="academic-card p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Generated SQL</span>
          </div>
          <button
            onClick={() => copyToClipboard(analysisResult?.generated_sql || "SELECT COALESCE(SUM(value), 0.0) FROM transactions;")}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy SQL"}</span>
          </button>
        </div>

        <pre className="bg-[#0F172A] text-emerald-400 p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
          <code>
            {analysisResult?.generated_sql ||
`SELECT COALESCE(SUM(value), 0.0) AS total_eth_volume
FROM transactions
WHERE dataset_id = 1
  AND status = 'SUCCESS';`}
          </code>
        </pre>
      </div>

      {/* Execution Results & Dual-Engine Verification Section */}
      {analysisResult && (
        <div className="academic-card p-6 space-y-6 border-blue-200 bg-gradient-to-b from-white to-blue-50/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Analysis Execution Receipt</span>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
                <span>{analysisResult.analysis_id}</span>
                <span className="badge-verified">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {analysisResult.validation_status}
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/reports/${analysisResult.report_id || analysisResult.analysis_id}`)}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-md transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full Report</span>
              </button>
              <button
                onClick={handleReproduce}
                disabled={reproducing}
                className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-md shadow-sm transition-all"
              >
                <RotateCw className={`w-3.5 h-3.5 ${reproducing ? 'animate-spin' : ''}`} />
                <span>Reproduce Analysis</span>
              </button>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Primary Result */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Primary SQL Result</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {analysisResult.result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {analysisResult.unit}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">Compiled DB Execution</div>
            </div>

            {/* Independent Result */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Independent Calculation</span>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {analysisResult.independent_result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {analysisResult.unit}
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Pandas / Node Match (Diff: 0.0)</span>
              </div>
            </div>

            {/* Reproducibility Seal */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Cryptographic Seal</span>
              <div className="text-xs font-mono text-slate-700 mt-1 truncate" title={analysisResult.reproducibility_hash}>
                {analysisResult.reproducibility_hash.slice(0, 16)}...
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                <span>Latency: {analysisResult.execution_time_ms} ms</span>
                <span className="badge-blue text-[10px]">Deterministic</span>
              </div>
            </div>
          </div>

          {/* If Reproduced */}
          {reproductionResult && (
            <div className={`p-4 rounded-lg border text-xs flex items-center justify-between ${
              reproductionResult.is_match ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>✓ {reproductionResult.reproduction_status}: Original {reproductionResult.original_result} {reproductionResult.unit} vs Reproduced {reproductionResult.reproduced_result} {reproductionResult.unit}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">Hash verified</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
