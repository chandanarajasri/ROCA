import React, { useEffect, useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Terminal,
  Database,
  Layers,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { Metric, QueryGenerateResponse } from '../types';

export const QueryGenerator: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [selectedMetricId, setSelectedMetricId] = useState<string>('TX-VOLUME-001');
  const [timeDays, setTimeDays] = useState<number | undefined>(undefined);
  const [generated, setGenerated] = useState<QueryGenerateResponse | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedWeb3, setCopiedWeb3] = useState(false);

  useEffect(() => {
    api.getMetrics().then(data => {
      setMetrics(data);
    });
  }, []);

  useEffect(() => {
    if (selectedMetricId) {
      api.generateQuery({
        metric_id: selectedMetricId,
        dataset_id: 1,
        time_days: timeDays,
        chain: "Ethereum"
      }).then(res => {
        setGenerated(res);
      }).catch(err => console.error("Query generation failed:", err));
    }
  }, [selectedMetricId, timeDays]);

  const copySql = () => {
    if (generated) {
      navigator.clipboard.writeText(generated.standard_sql);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const copyWeb3 = () => {
    if (generated) {
      navigator.clipboard.writeText(generated.web3_python);
      setCopiedWeb3(true);
      setTimeout(() => setCopiedWeb3(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Generated Query Output</h1>
        <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
          Formal output derived from the Semantic Engine. This translates your natural language request into executable institutional-grade queries. Review and execute via your preferred environment.
        </p>
      </div>

      {/* Query Customizer Bar */}
      <div className="academic-card p-4 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Select Canonical Metric:</label>
          <select
            value={selectedMetricId}
            onChange={(e) => setSelectedMetricId(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {metrics.map(m => (
              <option key={m.metric_id} value={m.metric_id}>
                {m.metric_id} - {m.display_name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700">Time Interval:</label>
          <select
            value={timeDays || ''}
            onChange={(e) => setTimeDays(e.target.value ? Number(e.target.value) : undefined)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">All-Time Dataset</option>
            <option value="1">Last 24 Hours</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Side-by-side Dual Code View matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Standard SQL */}
        <div className="academic-card overflow-hidden flex flex-col bg-[#0F172A] border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <span>STANDARD SQL</span>
            </div>
            <button
              onClick={copySql}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors"
            >
              {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedSql ? "COPIED" : "COPY"}</span>
            </button>
          </div>

          <div className="p-4 flex-1 overflow-x-auto text-xs font-mono leading-relaxed text-blue-300">
            <pre>
              <code>
                {generated?.standard_sql || "-- Aggregated formal SQL query\nSELECT COALESCE(SUM(value), 0.0) FROM transactions;"}
              </code>
            </pre>
          </div>
        </div>

        {/* Right: Web3.py (Python) */}
        <div className="academic-card overflow-hidden flex flex-col bg-[#0F172A] border-slate-800">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>&lt;&gt; WEB3.PY (PYTHON)</span>
            </div>
            <button
              onClick={copyWeb3}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors"
            >
              {copiedWeb3 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedWeb3 ? "COPIED" : "COPY"}</span>
            </button>
          </div>

          <div className="p-4 flex-1 overflow-x-auto text-xs font-mono leading-relaxed text-emerald-300">
            <pre>
              <code>
                {generated?.web3_python || "# Web3.py equivalent implementation\nfrom web3 import Web3\n"}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
