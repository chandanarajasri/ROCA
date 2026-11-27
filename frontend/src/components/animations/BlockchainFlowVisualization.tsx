import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Terminal,
  Network,
  Sigma,
  Code2,
  Database,
  CheckCircle2,
  FileText,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react';

export const BlockchainFlowVisualization: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [txHash, setTxHash] = useState('0x7f9a...3e41');
  const [gasGwei, setGasGwei] = useState('18.4');
  const [blockNumber, setBlockNumber] = useState(19842103);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
      setBlockNumber((prev) => prev + 1);
      setGasGwei((14 + Math.random() * 8).toFixed(1));
      const randomHex = Math.random().toString(16).substring(2, 6);
      setTxHash(`0x${randomHex}...${Math.random().toString(16).substring(2, 6)}`);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const flowNodes = [
    {
      id: 0,
      title: 'Wallet A / User Query',
      subtitle: '0x71C...3aF',
      desc: 'Natural language intent or raw transaction trigger',
      icon: Search,
      path: '/workspace',
      color: 'from-blue-500 to-cyan-400',
      badge: 'Intent Trigger',
    },
    {
      id: 1,
      title: 'Query Parser',
      subtitle: 'AST Generation',
      desc: 'Abstract syntax tree parsing & tokenization',
      icon: Terminal,
      path: '/workspace',
      color: 'from-indigo-500 to-blue-400',
      badge: 'Parsing Tree',
    },
    {
      id: 2,
      title: 'Semantic Rule Engine',
      subtitle: 'Formal Logic',
      desc: 'Ontology mapping & strict mathematical invariant verification',
      icon: Network,
      path: '/semantic-engine',
      color: 'from-purple-500 to-indigo-500',
      badge: 'Formal Logic',
    },
    {
      id: 3,
      title: 'Metric & SQL Engine',
      subtitle: 'AST to SQL',
      desc: 'Standardized metrics execution across normalized ledger data',
      icon: Sigma,
      path: '/metric-repository',
      color: 'from-fuchsia-500 to-purple-500',
      badge: 'SQL Synthesis',
    },
    {
      id: 4,
      title: 'Validation Engine',
      subtitle: 'Bounds & Statistical',
      desc: 'Automated bounds checking, multi-node cross verification',
      icon: CheckCircle2,
      path: '/validation',
      color: 'from-emerald-500 to-teal-400',
      badge: '100% Checked',
    },
    {
      id: 5,
      title: 'Reproducibility Report',
      subtitle: 'Cryptographic Proof',
      desc: 'ZK-provable deterministic execution certificate and artifacts',
      icon: FileText,
      path: '/reports',
      color: 'from-cyan-400 to-blue-500',
      badge: 'Proof Sealed',
    },
  ];

  return (
    <div className="w-full relative">
      {/* Top Live On-Chain Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 mb-8 rounded-xl web3-glass border border-slate-700/60 text-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-slate-300 font-mono">Live On-Chain Pipeline</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono">Block #{blockNumber}</span>
        </div>

        <div className="flex items-center gap-6 text-slate-300 font-mono">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Gas: {gasGwei} Gwei</span>
          </div>
          <div className="flex items-center gap-1.5 hidden sm:flex">
            <Radio className="w-3.5 h-3.5 text-purple-400" />
            <span>Tx: {txHash}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Deterministic</span>
          </div>
        </div>
      </div>

      {/* Interactive Flow Grid with Traveling Laser Packet Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {flowNodes.map((node, idx) => {
          const Icon = node.icon;
          const isActive = activeStep === idx;
          return (
            <div
              key={node.id}
              onClick={() => navigate(node.path)}
              className={`relative p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group ${
                isActive
                  ? 'web3-glass border-indigo-500/80 shadow-[0_0_35px_rgba(99,102,241,0.35)] scale-[1.02]'
                  : 'web3-glass-card hover:border-slate-500/40 hover:scale-[1.01]'
              }`}
            >
              {/* Active glow gradient backdrop */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/15 via-purple-600/10 to-transparent pointer-events-none" />
              )}

              {/* Header row */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? `bg-gradient-to-tr ${node.color} text-white shadow-[0_0_20px_rgba(99,102,241,0.6)]`
                      : 'bg-slate-800/90 text-slate-300 border border-slate-700/80 group-hover:text-white group-hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/60">
                    Step 0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* Title & info */}
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {node.title}
                  </h3>
                </div>
                <div className="text-[11px] font-mono text-indigo-400/90 font-medium">
                  {node.subtitle}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {node.desc}
                </p>
              </div>

              {/* Action footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-indigo-300 transition-colors relative z-10">
                <span className="text-[11px] font-medium text-slate-500 group-hover:text-slate-300">
                  {node.badge}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold">
                  Inspect Module <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              {/* Animated bottom progress bar for active card */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
