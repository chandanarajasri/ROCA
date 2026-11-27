import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  RotateCw,
  Download,
  AlertTriangle,
  Clock,
  Layers,
  Database,
  Cpu,
  FileCode2
} from 'lucide-react';
import { api } from '../services/api';

export const ValidationPage: React.FC = () => {
  const [divergence, setDivergence] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [reRunning, setReRunning] = useState(false);

  useEffect(() => {
    api.getStateDivergence()
      .then(data => setDivergence(data))
      .catch(err => console.error("Validation error:", err));
  }, []);

  const handleReRun = async () => {
    setReRunning(true);
    setTimeout(() => {
      setReRunning(false);
    }, 800);
  };

  const handleExportDiff = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(divergence, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ROCA_State_Divergence_Diff.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header matching Screenshot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Result Validation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing semantic SQL outputs against raw blockchain node state for ETH-USDC Uniswap V3 Pool.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReRun}
            disabled={reRunning}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-md shadow-sm transition-all"
          >
            <RotateCw className={`w-3.5 h-3.5 ${reRunning ? 'animate-spin' : ''}`} />
            <span>Re-run</span>
          </button>
          <button
            onClick={handleExportDiff}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-md shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Diff</span>
          </button>
        </div>
      </div>

      {/* 4 Stat KPI Cards matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Consistency Score */}
        <div className="academic-card p-5 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Consistency Score
          </div>
          <div className="text-3xl font-black text-emerald-600">
            99.98%
          </div>
          <div className="flex items-center gap-1">
            <span className="badge-verified text-[10px]">High Confidence</span>
          </div>
        </div>

        {/* Card 2: Block Height Range */}
        <div className="academic-card p-5 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Block Height Range
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            18.2M <span className="text-sm font-normal text-slate-400">to</span> 18.3M
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            100,000 blocks analyzed
          </div>
        </div>

        {/* Card 3: Total Discrepancies */}
        <div className="academic-card p-5 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Total Discrepancies
          </div>
          <div className="text-3xl font-black text-rose-600 flex items-baseline gap-2">
            <span>42</span>
            <span className="text-xs font-normal text-slate-500">records</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="badge-draft text-[10px] bg-rose-50 text-rose-700 border-rose-200">Requires Review</span>
          </div>
        </div>

        {/* Card 4: Execution Time */}
        <div className="academic-card p-5 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Execution Time
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            1m 24s
          </div>
          <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
            <Cpu className="w-3 h-3 text-blue-500" />
            <span>SQL + Node RPC</span>
          </div>
        </div>
      </div>

      {/* State Divergence Analysis Section matching Screenshot */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">State Divergence Analysis</h2>
          <p className="text-xs text-slate-500">Comparative differential between database schema aggregation and raw node event logs.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: SQL Semantic Result */}
          <div className="academic-card overflow-hidden flex flex-col bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
                <Database className="w-4 h-4 text-blue-600" />
                <span>SQL Semantic Result (Snowflake/DB)</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                SELECT * FROM dex_swaps
              </span>
            </div>

            <div className="p-5 flex-1 font-mono text-xs text-slate-800 bg-slate-50/50">
              <pre className="overflow-x-auto leading-relaxed">
                {`{
  "tx_hash": "0x7e2d...0e2a",
  "block_number": 18492105,
  "amount_in": "1000.00",
  "amount_out": "150000.00",
  "pool_fee": 3000
}`}
              </pre>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600">
              Semantic layer aggregates minor precision differences during decimal conversion.
            </div>
          </div>

          {/* Right Panel: Raw Blockchain Node Result */}
          <div className="academic-card overflow-hidden flex flex-col bg-white">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 text-xs font-bold">
                <FileCode2 className="w-4 h-4 text-purple-600" />
                <span>Raw Blockchain Node Result (Ganache/RPC)</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                eth_getLogs
              </span>
            </div>

            <div className="p-5 flex-1 font-mono text-xs text-slate-800 bg-slate-50/50 relative">
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-4 right-4" title="Discrepancy Point"></span>
              <pre className="overflow-x-auto leading-relaxed">
                {`{
  "transactionHash": "0x7e2d...0e2a",
  "blockNumber": "0x11a1879",
  "amount0": "0x00000000000000000000000000000000000000000000003635c9adc5dea00000",
  "amount1": "0xffffffffffffffffffffffffffffffffffffffffffffffffdd0a56a62c640000",
  "fee": 3000
}`}
              </pre>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-rose-700 font-medium">
              Raw node RPC returns unparsed hex values. Mismatch detected in decimal translation for amount1.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
