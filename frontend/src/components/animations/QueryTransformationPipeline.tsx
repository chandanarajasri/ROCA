import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Terminal,
  Network,
  Sigma,
  Code2,
  Database,
  CheckCircle2,
  ArrowRight,
  Play,
  RotateCw,
  Copy,
  Check,
  Cpu,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const QueryTransformationPipeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const queryExamples = [
    {
      nl: "Show the total transaction volume for the top 10 wallets.",
      intent: "transaction_volume_grouped",
      ast: `AST {
  Operator: SUM(transaction.value),
  GroupBy: transaction.sender,
  OrderBy: SUM(transaction.value) DESC,
  Limit: 10,
  Filter: [status = 'SUCCESS']
}`,
      latex: `\\sum_{i \\in W_{10}} v_i \\quad \\text{where } W_{10} = \\operatorname{arg\\,max}_{|W|=10} \\sum_{t \\in T_w} v_t`,
      sql: `SELECT sender, COALESCE(SUM(value), 0.0) AS total_eth_volume
FROM transactions
WHERE status = 'SUCCESS'
GROUP BY sender
ORDER BY total_eth_volume DESC
LIMIT 10;`,
      dataset: "Ethereum Mainnet Snapshot (Block 18492000 - 18492105)",
      result: "Top Wallet 0x7A3...91F: 428.60 ETH (Total Top-10: 1,489.20 ETH)",
      seal: "8a4f91e2b4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d8"
    },
    {
      nl: "How much ETH was transferred in total across confirmed blocks?",
      intent: "transaction_volume",
      ast: `AST {
  Operator: SUM(transaction.value),
  Constraint: dataset_id = 1,
  Filter: [status = 'SUCCESS']
}`,
      latex: `\\sum_{i=1}^N v_i \\quad \\text{where } v_i \\ge 0`,
      sql: `SELECT COALESCE(SUM(value), 0.0) AS total_transferred
FROM transactions
WHERE dataset_id = 1
  AND status = 'SUCCESS';`,
      dataset: "Curated Research Sample (50 Target Transactions)",
      result: "16.30 ETH (Primary SQL: 16.30, Pandas Vector: 16.30, Diff: 0.0)",
      seal: "73977599272be3aa838254f4402691c7cbeb77fe4f1f76769e6d839c9a254e0f"
    }
  ];

  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const currentExample = queryExamples[selectedExampleIndex];

  // Auto-play through stages
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 5);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stages = [
    {
      num: '01',
      title: 'Natural Language',
      badge: 'Raw Analyst Input',
      icon: Terminal,
      color: '#38BDF8',
      summary: 'High-level analytical query with human phrasing and ambiguous terms.'
    },
    {
      num: '02',
      title: 'Formal Query Semantics',
      badge: 'Mathematical AST',
      icon: Sigma,
      color: '#818CF8',
      summary: 'Disambiguated formal semantics, LaTeX mathematical formalisms, and AST.'
    },
    {
      num: '03',
      title: 'SQL / Web3 Generator',
      badge: 'Deterministic Code',
      icon: Code2,
      color: '#A855F7',
      summary: 'Executable parameterized SQL with exact type-safe constraint bindings.'
    },
    {
      num: '04',
      title: 'Blockchain Dataset',
      badge: 'Normalized Ingestion',
      icon: Database,
      color: '#EC4899',
      summary: 'Dual-engine evaluation against SQLite / Postgres & Pandas vector stream.'
    },
    {
      num: '05',
      title: 'Reproducible Result',
      badge: 'SHA-256 State Seal',
      icon: ShieldCheck,
      color: '#10B981',
      summary: 'Cryptographically sealed analytical receipt reproducible with 10^-6 ETH exactness.'
    }
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full relative roca-dark-card p-6 sm:p-10 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Formal Query Semantics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            QUERY WITH MEANING.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl font-light">
            Eliminating semantic ambiguity by compiling natural language questions into formal abstract syntax trees, verified mathematical proofs, and executable deterministic SQL.
          </p>
        </div>

        {/* Play / Pause / Example Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-all"
          >
            {isPlaying ? (
              <>
                <RotateCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                <span>Auto-playing</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-300" />
                <span>Step Through</span>
              </>
            )}
          </button>

          <button
            onClick={() => setSelectedExampleIndex((selectedExampleIndex + 1) % queryExamples.length)}
            className="px-3.5 py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-xs font-semibold text-indigo-200 transition-all"
          >
            Switch Example
          </button>
        </div>
      </div>

      {/* 5-Stage Interactive Progress Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-8">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={stage.num}
              onClick={() => {
                setActiveStep(idx);
                setIsPlaying(false);
              }}
              className={`p-3.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-950/60 to-[#0F172A] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)]'
                  : isPassed
                  ? 'bg-white/[0.02] border-indigo-500/30 text-slate-300'
                  : 'bg-white/[0.01] border-white/5 text-slate-500 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-indigo-400' : 'text-slate-500'}`}>
                  STAGE {stage.num}
                </span>
                <div
                  style={{ backgroundColor: isActive ? stage.color : 'rgba(255,255,255,0.05)' }}
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white"
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="text-xs font-bold text-slate-100 truncate">
                {stage.title}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5 truncate">
                {stage.badge}
              </div>

              {isActive && (
                <div
                  style={{ backgroundColor: stage.color }}
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                ></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Stage Transformation Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Natural Language & Pipeline Description (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 p-6 rounded-2xl bg-black/40 border border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold tracking-wider">
                Current Transformation Step
              </span>
              <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                Stage 0{activeStep + 1} / 05
              </span>
            </div>

            <h3 className="text-xl font-bold text-white font-heading">
              {stages[activeStep].title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {stages[activeStep].summary}
            </p>

            {/* Input Natural Query Card */}
            <div className="p-4 rounded-xl bg-[#090D16] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-semibold">
                Input Natural Query
              </span>
              <p className="text-sm font-medium text-indigo-200 italic">
                "{currentExample.nl}"
              </p>
            </div>
          </div>

          {/* Micro Flow indicator */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Deterministic Semantics</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Formal Logic
            </span>
          </div>
        </div>

        {/* Right Side: Compiled Representation Window (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col p-6 rounded-2xl bg-[#0B0F1A] border border-indigo-500/30 relative shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></div>
              <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
                {activeStep === 0 && "NaturalLanguage.prompt"}
                {activeStep === 1 && "FormalQuery.ast"}
                {activeStep === 2 && "CompiledExecution.sql"}
                {activeStep === 3 && "DualEngineValidation.pandas"}
                {activeStep === 4 && "ReproducibilitySeal.sha256"}
              </span>
            </div>

            <button
              onClick={() => {
                const text =
                  activeStep === 0 ? currentExample.nl :
                  activeStep === 1 ? currentExample.ast :
                  activeStep === 2 ? currentExample.sql :
                  activeStep === 3 ? currentExample.result :
                  currentExample.seal;
                handleCopy(text);
              }}
              className="text-xs text-slate-400 hover:text-slate-100 flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Stage Code & Visual Viewport */}
          <div className="flex-1 flex flex-col justify-center min-h-[220px]">
            {activeStep === 0 && (
              <div className="p-6 rounded-xl bg-black/50 border border-sky-500/20 font-mono text-sm sm:text-base text-sky-300 leading-relaxed animate-fade-up">
                <span className="text-slate-500 text-xs block mb-2">// Raw natural language input</span>
                "{currentExample.nl}"
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-3 animate-fade-up">
                <pre className="p-4 rounded-xl bg-black/60 border border-indigo-500/30 font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
                  <code>{currentExample.ast}</code>
                </pre>
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 font-mono text-xs text-slate-300 flex items-center gap-2">
                  <span className="text-indigo-400 font-bold">LaTeX:</span>
                  <span className="text-emerald-300 overflow-x-auto font-mono">{currentExample.latex}</span>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <pre className="p-5 rounded-xl bg-black/60 border border-purple-500/30 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed animate-fade-up">
                <code>{currentExample.sql}</code>
              </pre>
            )}

            {activeStep === 3 && (
              <div className="p-5 rounded-xl bg-black/60 border border-pink-500/30 space-y-3 animate-fade-up">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Target Dataset:</span>
                  <span className="text-pink-300 font-semibold">{currentExample.dataset}</span>
                </div>
                <div className="p-3 bg-white/5 rounded font-mono text-xs text-emerald-300">
                  Primary SQL Result: <span className="font-bold text-white">MATCH</span>
                </div>
                <div className="p-3 bg-white/5 rounded font-mono text-xs text-cyan-300">
                  Pandas Vector Result: <span className="font-bold text-white">MATCH</span> (Tolerance: 10⁻⁶ ETH)
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="p-5 rounded-xl bg-black/60 border border-emerald-500/40 space-y-4 animate-fade-up">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% REPRODUCIBLE SCIENTIFIC VERIFICATION</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400">Immutable State Seal (SHA-256)</span>
                  <div className="font-mono text-xs text-emerald-300 bg-black/70 p-2.5 rounded border border-emerald-500/30 break-all select-all">
                    {currentExample.seal}
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Computed Output: <strong className="text-white">{currentExample.result}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
