import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Terminal,
  Search,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Zap,
  CornerDownLeft,
  FileText
} from 'lucide-react';

export const InteractiveQueryStudio: React.FC = () => {
  const navigate = useNavigate();
  const [queryText, setQueryText] = useState("Which wallet transferred the highest amount of ETH?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [result, setResult] = useState<any | null>(null);

  const presets = [
    "Which wallet transferred the highest amount of ETH?",
    "How much ETH was transferred in total across confirmed blocks?",
    "How many active wallets interacted with smart contracts?",
    "What was the total cumulative gas used by all transactions?"
  ];

  const pipelineStages = [
    { label: "UNDERSTANDING QUERY", desc: "NLP entity & intent resolution via Semantic Rule Engine" },
    { label: "GENERATING FORMAL QUERY", desc: "Compiling formal AST representation & type-safe SQL template" },
    { label: "EXECUTING ANALYSIS", desc: "Executing primary SQL DB engine & independent Pandas vector validator" },
    { label: "GENERATING RESULT", desc: "Computing cryptographic SHA-256 state seal and generating receipt" }
  ];

  const handleSimulate = (queryToRun?: string) => {
    const q = queryToRun || queryText;
    if (!q.trim() || isProcessing) return;

    setIsProcessing(true);
    setCurrentStep(0);
    setResult(null);

    // Step 1
    setTimeout(() => {
      setCurrentStep(1);
    }, 450);

    // Step 2
    setTimeout(() => {
      setCurrentStep(2);
    }, 900);

    // Step 3
    setTimeout(() => {
      setCurrentStep(3);
    }, 1400);

    // Step 4: Finished Result
    setTimeout(() => {
      setCurrentStep(4);
      setIsProcessing(false);
      setResult({
        metric: "Max Wallet Outflow / Volume",
        metricId: "TX-VOLUME-001",
        topWallet: "0x7A3c9F82B3e...91F84c",
        computedValue: "428.60 ETH",
        txCount: 1284,
        sql: "SELECT sender, MAX(value) FROM transactions WHERE status = 'SUCCESS' GROUP BY sender ORDER BY MAX(value) DESC LIMIT 1;",
        hash: "73977599272be3aa838254f4402691c7cbeb77fe4f1f76769e6d839c9a254e0f",
        tolerance: "10^-6 ETH (0.000000 Difference)",
        status: "VERIFIED & REPRODUCIBLE"
      });
    }, 1900);
  };

  return (
    <div className="w-full relative roca-dark-card p-6 sm:p-10 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Query Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
          ASK THE BLOCKCHAIN.
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 font-light">
          Ask questions in plain English. Watch formal query compilation and dual-engine verification synthesize audit-ready answers live.
        </p>
      </div>

      {/* Input Box Area */}
      <div className="max-w-3xl mx-auto space-y-4 relative z-10">
        <div className="relative rounded-2xl bg-black/70 border border-white/15 focus-within:border-indigo-500/80 focus-within:ring-4 focus-within:ring-indigo-500/20 shadow-2xl transition-all p-2">
          <div className="flex items-center px-4 py-2 gap-3">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              value={queryText}
              onChange={(e) => setQueryText(e.target.value)}
              placeholder="Ask a question about the blockchain..."
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSimulate();
              }}
            />
            <button
              onClick={() => handleSimulate()}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)] active:scale-[0.98]"
            >
              {isProcessing ? (
                <>
                  <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preset Prompt Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <span className="text-[11px] font-mono uppercase text-slate-500">Presets:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQueryText(preset);
                handleSimulate(preset);
              }}
              className="text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-3 py-1 rounded-full border border-white/10 transition-colors"
            >
              {preset.length > 38 ? preset.slice(0, 38) + "..." : preset}
            </button>
          ))}
        </div>

        {/* Pipeline Execution Animation Step-Through */}
        {isProcessing && (
          <div className="p-6 rounded-2xl bg-black/60 border border-indigo-500/30 space-y-4 animate-fade-up">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
              <span className="flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Running Formal Verification Pipeline</span>
              </span>
              <span>Step 0{currentStep + 1} / 04</span>
            </div>

            <div className="space-y-2.5">
              {pipelineStages.map((stage, sIdx) => {
                const isActive = currentStep === sIdx;
                const isPassed = currentStep > sIdx;

                return (
                  <div
                    key={sIdx}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs transition-all ${
                      isActive
                        ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                        : isPassed
                        ? 'bg-white/5 border-emerald-500/30 text-emerald-300'
                        : 'bg-white/[0.02] border-white/5 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-indigo-600 text-white'
                            : isPassed
                            ? 'bg-emerald-500 text-black'
                            : 'bg-white/10 text-slate-500'
                        }`}
                      >
                        {isPassed ? "✓" : sIdx + 1}
                      </div>
                      <span className="font-mono font-bold tracking-wider">{stage.label}</span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                      {stage.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Final Result Card */}
        {result && !isProcessing && (
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0C121E] to-[#0A0D15] border border-emerald-500/40 shadow-2xl space-y-6 animate-fade-up">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                  Formal Verification Receipt
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight mt-0.5 font-heading">
                  {result.metric}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge-dark-pill text-emerald-400 border-emerald-500/30 bg-emerald-950/40">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {result.status}
                </span>
              </div>
            </div>

            {/* Top result metric */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Top Origin Account</span>
                <div className="font-mono text-xs text-indigo-300 font-bold truncate">
                  {result.topWallet}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Transferred Volume</span>
                <div className="font-mono text-lg text-emerald-400 font-black">
                  {result.computedValue}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Tolerance Check</span>
                <div className="font-mono text-xs text-cyan-300 font-bold">
                  {result.tolerance}
                </div>
              </div>
            </div>

            {/* Generated SQL preview */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400">Compiled Standard SQL</span>
              <pre className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto">
                <code>{result.sql}</code>
              </pre>
            </div>

            {/* Cryptographic Proof Hash */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Cryptographic State Hash (SHA-256)</span>
              <div className="font-mono text-[10px] text-slate-300 bg-black/80 p-2.5 rounded-lg border border-emerald-500/30 break-all select-all">
                {result.hash}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => navigate('/workspace')}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg active:scale-[0.98]"
              >
                <span>Open Full Query Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/reports')}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Verification Reports</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
