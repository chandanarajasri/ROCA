import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles, Database } from 'lucide-react';

export const TransactionParticleFlow: React.FC = () => {
  const [pulseCount, setPulseCount] = useState(1);

  const triggerPacket = () => {
    setPulseCount((prev) => prev + 1);
  };

  return (
    <div className="w-full web3-glass rounded-2xl p-6 sm:p-8 border border-slate-700/60 my-10 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-indigo-500/15 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real-time On-Chain Semantic Verification</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Ethereum Transaction & Formal Logic Pipeline
          </h3>
        </div>

        <button
          onClick={triggerPacket}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all active:scale-95 self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Simulate ETH Transaction</span>
        </button>
      </div>

      {/* Animated Flow Map */}
      <div className="relative py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 z-10">
        {/* Node 1: Wallet A */}
        <div className="flex flex-col items-center text-center w-full md:w-48 bg-slate-900/80 border border-slate-700/80 p-4 rounded-xl shadow-lg relative group hover:border-cyan-500/60 transition-colors">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-2 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="font-mono font-bold text-sm">0xA</span>
          </div>
          <span className="text-xs font-bold text-white">Wallet A (Sender)</span>
          <span className="text-[10px] font-mono text-cyan-300 mt-0.5">0x71C...3aF</span>
          <span className="text-[10px] text-slate-400 mt-1">2.45 ETH Sent</span>
        </div>

        {/* Animated Connector Line 1 */}
        <div className="hidden md:flex flex-1 items-center justify-center relative px-2">
          <svg className="w-full h-8" viewBox="0 0 200 24" fill="none">
            <line
              x1="0"
              y1="12"
              x2="200"
              y2="12"
              stroke="#4338CA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated Laser Particle */}
            <circle cx="20" cy="12" r="4" fill="#38BDF8">
              <animate
                attributeName="cx"
                from="0"
                to="200"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="12" r="8" fill="#38BDF8" opacity="0.3">
              <animate
                attributeName="cx"
                from="0"
                to="200"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Node 2: ROCA Semantic Rule Engine */}
        <div className="flex flex-col items-center text-center w-full md:w-56 bg-slate-900/90 border border-indigo-500/60 p-5 rounded-xl shadow-[0_0_25px_rgba(99,102,241,0.25)] relative group">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mb-2 shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-pulse">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-bold text-white">ROCA Semantic Engine</span>
          <span className="text-[10px] font-mono text-purple-300 mt-0.5">Formal Semantics AST</span>
          <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Invariant Checked</span>
          </div>
        </div>

        {/* Animated Connector Line 2 */}
        <div className="hidden md:flex flex-1 items-center justify-center relative px-2">
          <svg className="w-full h-8" viewBox="0 0 200 24" fill="none">
            <line
              x1="0"
              y1="12"
              x2="200"
              y2="12"
              stroke="#4338CA"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated Laser Particle */}
            <circle cx="20" cy="12" r="4" fill="#A855F7">
              <animate
                attributeName="cx"
                from="0"
                to="200"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="20" cy="12" r="8" fill="#A855F7" opacity="0.3">
              <animate
                attributeName="cx"
                from="0"
                to="200"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        {/* Node 3: Wallet B / On-Chain Finality */}
        <div className="flex flex-col items-center text-center w-full md:w-48 bg-slate-900/80 border border-slate-700/80 p-4 rounded-xl shadow-lg relative group hover:border-emerald-500/60 transition-colors">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-2 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <span className="font-mono font-bold text-sm">0xB</span>
          </div>
          <span className="text-xs font-bold text-white">Wallet B (Recipient)</span>
          <span className="text-[10px] font-mono text-emerald-300 mt-0.5">0x92D...8Bc</span>
          <span className="text-[10px] text-slate-400 mt-1">Verified on Block #19842103</span>
        </div>
      </div>
    </div>
  );
};
