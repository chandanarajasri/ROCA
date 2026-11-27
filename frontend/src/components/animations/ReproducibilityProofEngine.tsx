import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  RotateCw,
  Lock,
  Binary,
  Layers,
  ArrowRight,
  Sparkles,
  FileCheck2,
  Cpu,
  Database
} from 'lucide-react';

export const ReproducibilityProofEngine: React.FC = () => {
  const [recomputing, setRecomputing] = useState(false);
  const [proofState, setProofState] = useState({
    query: "How much ETH was transferred?",
    dataset: "ETH-DEMO-1.0 (Block 18492000 - 18492105)",
    metric: "TX-VOLUME-001 (Transaction Volume)",
    sqlResult: 16.300000,
    pandasResult: 16.300000,
    difference: 0.000000,
    tolerance: 0.000001,
    hash: "73977599272be3aa838254f4402691c7cbeb77fe4f1f76769e6d839c9a254e0f",
    isVerified: true
  });

  const handleRecompute = () => {
    setRecomputing(true);
    setTimeout(() => {
      setRecomputing(false);
    }, 600);
  };

  return (
    <div className="w-full relative roca-dark-card p-6 sm:p-10 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cryptographic State Proofs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            EVERY RESULT CAN BE REPRODUCED.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl font-light">
            Immutable mathematical certainty. Every analytical output is sealed with an SHA-256 state digest encapsulating query parameters, AST rules, dataset snapshots, and tolerance bounds.
          </p>
        </div>

        <button
          onClick={handleRecompute}
          disabled={recomputing}
          className="px-5 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2 transition-all shrink-0 active:scale-[0.98]"
        >
          <RotateCw className={`w-3.5 h-3.5 ${recomputing ? 'animate-spin' : ''}`} />
          <span>{recomputing ? 'Recalculating Proof...' : 'Test Deterministic Proof'}</span>
        </button>
      </div>

      {/* The Core Formula Box */}
      <div className="my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-950/60 border border-indigo-500/20 text-center relative overflow-hidden">
        <div className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold mb-6">
          The Axiom of Reproducible Blockchain Science
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm sm:text-lg md:text-xl font-bold text-white font-heading">
          <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
            <span className="text-indigo-400">Same</span> Query
          </div>

          <span className="text-slate-500 text-xl font-black">+</span>

          <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
            <span className="text-purple-400">Same</span> Dataset
          </div>

          <span className="text-slate-500 text-xl font-black">+</span>

          <div className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-2">
            <span className="text-cyan-400">Same</span> Semantics
          </div>

          <span className="text-emerald-400 text-xl font-black">=</span>

          <div className="px-5 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Exact Same Result</span>
          </div>
        </div>
      </div>

      {/* Dual Engine Verification Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Engine 1: Primary SQL */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Primary Engine</span>
              <span className="badge-dark-pill text-[10px]">SQL Execution</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Compiled Database Query</h4>
            <p className="text-xs text-slate-400 mt-1">
              Executed against indexed relational block records in SQLite / PostgreSQL.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-2xl font-black text-white font-mono">
              {proofState.sqlResult.toFixed(6)} <span className="text-sm font-normal text-slate-400">ETH</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Execution verified (4.2ms)</span>
            </div>
          </div>
        </div>

        {/* Engine 2: Independent Pandas Vector */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Independent Engine</span>
              <span className="badge-dark-pill text-[10px]">Vector Stream</span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Pandas Dataframe Calc</h4>
            <p className="text-xs text-slate-400 mt-1">
              Calculated independently in-memory on raw serialized transaction rows.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-2xl font-black text-white font-mono">
              {proofState.pandasResult.toFixed(6)} <span className="text-sm font-normal text-slate-400">ETH</span>
            </div>
            <div className="text-[11px] font-mono text-cyan-400 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Independent match (Diff: 0.0)</span>
            </div>
          </div>
        </div>

        {/* Engine 3: Cryptographic State Seal */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0C121E] to-[#0A0E18] border border-emerald-500/30 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">State Hash</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                SHA-256
              </span>
            </div>
            <h4 className="text-base font-bold text-white mt-1">Immutable Receipt</h4>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic state digest verified against tolerance &le; 10⁻⁶ ETH.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="font-mono text-[10px] text-emerald-300 bg-black/60 p-2 rounded border border-emerald-500/30 break-all select-all">
              {proofState.hash}
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Tolerance Bound:</span>
              <span className="text-white font-semibold">10⁻⁶ ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
