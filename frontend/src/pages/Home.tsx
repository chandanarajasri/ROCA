import React, { useEffect, useState } from 'react';
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
  Activity,
  ShieldCheck,
  Sparkles,
  Layers,
  Cpu,
  ChevronDown,
  Lock,
  Binary,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { BlockchainCanvasNetwork } from '../components/animations/BlockchainCanvasNetwork';
import { InteractiveNetworkVisualizer } from '../components/animations/InteractiveNetworkVisualizer';
import { QueryTransformationPipeline } from '../components/animations/QueryTransformationPipeline';
import { ReproducibilityProofEngine } from '../components/animations/ReproducibilityProofEngine';
import { AnalyticsTelemetryDashboard } from '../components/animations/AnalyticsTelemetryDashboard';
import { InteractiveQueryStudio } from '../components/animations/InteractiveQueryStudio';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreModules = [
    {
      title: "Query Parser",
      subtitle: "AST COMPILATION",
      desc: "Translates analyst intent into structured abstract syntax trees without external LLM dependencies.",
      icon: Terminal,
      color: "from-blue-500/20 to-indigo-500/20",
      border: "hover:border-blue-500/50",
      link: "/workspace"
    },
    {
      title: "Semantic Rule Engine",
      subtitle: "ONTOLOGY DISAMBIGUATION",
      desc: "Applies formal logic to map natural language synonyms to canonical metric formalisms with confidence scores.",
      icon: Network,
      color: "from-indigo-500/20 to-purple-500/20",
      border: "hover:border-indigo-500/50",
      link: "/semantic-engine"
    },
    {
      title: "Metric Repository",
      subtitle: "MATHEMATICAL FORMULAS",
      desc: "Centralized version-controlled repository of LaTeX definitions, AST representations, and Web3 templates.",
      icon: Sigma,
      color: "from-purple-500/20 to-pink-500/20",
      border: "hover:border-purple-500/50",
      link: "/metric-repository"
    },
    {
      title: "Dataset Explorer",
      subtitle: "NORMALIZED INGESTION",
      desc: "High-throughput querying across normalized Ethereum block streams and EVM smart contract logs.",
      icon: Database,
      color: "from-pink-500/20 to-rose-500/20",
      border: "hover:border-pink-500/50",
      link: "/dataset-explorer"
    },
    {
      title: "Dual-Engine Validation",
      subtitle: "INDEPENDENT CHECK",
      desc: "Evaluates compiled SQL against independent in-memory Pandas dataframe calculations with 10^-6 ETH bounds.",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/20",
      border: "hover:border-emerald-500/50",
      link: "/validation"
    },
    {
      title: "Reproducibility Reports",
      subtitle: "SHA-256 STATE SEALS",
      desc: "Generates immutable cryptographic receipts and academic research PDFs with one-click re-execution.",
      icon: FileText,
      color: "from-cyan-500/20 to-blue-500/20",
      border: "hover:border-cyan-500/50",
      link: "/reports"
    },
  ];

  const pipelineSteps = [
    { title: "Raw Blocks", desc: "EVM consensus payload", icon: Layers },
    { title: "Transactions", desc: "Normalized event logs", icon: Activity },
    { title: "Structured Data", desc: "Relational schema indexing", icon: Database },
    { title: "Formal Query", desc: "Deterministic mathematical AST", icon: Code2 },
    { title: "Reproducible Result", desc: "Cryptographically sealed", icon: ShieldCheck }
  ];

  return (
    <div className="w-full bg-[#07090E] text-slate-100 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. Animated Blockchain Network Background (60fps Canvas) */}
      <BlockchainCanvasNetwork />

      {/* 2. HERO SECTION (100vh Full Screen) */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 text-center pt-24 pb-16 overflow-hidden z-10">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-radial-gradient pointer-events-none opacity-80"></div>

        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 relative z-10 flex flex-col items-center">
          {/* Subtle Institutional Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-white/[0.04] text-slate-300 border border-white/10 backdrop-blur-md animate-fade-in-slow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Deterministic Blockchain Research Framework</span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400">Formal Query Semantics</span>
          </div>

          {/* Exact Project Title Revealed with Staggered Lines */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.12] sm:leading-[1.1] font-heading max-w-4xl text-white">
            <span className="block animate-line-reveal-1">
              A Framework for
            </span>
            <span className="block animate-line-reveal-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Reproducible On-Chain
            </span>
            <span className="block animate-line-reveal-3">
              Analytics through
            </span>
            <span className="block animate-line-reveal-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
              Formal Query Semantics
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-slow">
            A scientific and institutional framework for translating natural-language blockchain analytics questions into formally defined, verified, and reproducible analytical reports.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto animate-fade-in-slow">
            <button
              onClick={() => navigate('/workspace')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              <span>Start Analytics</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const elem = document.getElementById('overview');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs sm:text-sm font-semibold border border-white/10 transition-all backdrop-blur-sm"
            >
              Explore Methodology
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => {
            const elem = document.getElementById('overview');
            elem?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-xs font-mono"
        >
          <span className="text-[11px] tracking-wider uppercase">Scroll to explore pipeline</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* 3. SCROLL-DRIVEN TRANSITION: FROM RAW DATA TO FORMAL SEMANTICS */}
      <section id="overview" className="max-w-7xl mx-auto px-6 sm:px-12 py-20 sm:py-28 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-3">
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
            <span>The Transformation Architecture</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-400 font-heading">
              FROM RAW BLOCKCHAIN DATA
            </h3>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-heading">
              TO REPRODUCIBLE ANALYTICS
            </h3>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 font-heading">
              THROUGH FORMAL QUERY SEMANTICS
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed font-light">
            Traditional blockchain analytics suffers from semantic drift and non-deterministic query engines. ROCA guarantees end-to-end mathematical rigor.
          </p>
        </div>

        {/* Transformation Pipeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {pipelineSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="roca-dark-card p-6 flex flex-col justify-between gap-4 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STAGE 0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white font-heading group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="w-full h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE BLOCKCHAIN TOPOLOGY GRAPH SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16 relative z-10">
        <InteractiveNetworkVisualizer />
      </section>

      {/* 5. FORMAL QUERY SEMANTICS ("QUERY WITH MEANING.") */}
      <section id="transformation" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10">
        <QueryTransformationPipeline />
      </section>

      {/* 6. REPRODUCIBILITY GUARANTEE ("EVERY RESULT CAN BE REPRODUCED.") */}
      <section id="reproducibility" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10">
        <ReproducibilityProofEngine />
      </section>

      {/* 7. DATA / ANALYTICS SECTION ("INSTITUTIONAL METRICS.") */}
      <section id="analytics" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10">
        <AnalyticsTelemetryDashboard />
      </section>

      {/* 8. AI / QUERY GENERATOR SECTION ("ASK THE BLOCKCHAIN.") */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10">
        <InteractiveQueryStudio />
      </section>

      {/* 9. CORE ARCHITECTURAL MODULES */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Modular System Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            CORE MODULES.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 font-light">
            Comprehensive subsystems built for deterministic execution and independent mathematical verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(mod.link)}
                className={`roca-dark-card p-6 sm:p-7 flex flex-col justify-between gap-4 cursor-pointer group transition-all duration-300 ${mod.border}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                      {mod.subtitle}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                    <span>{mod.title}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-400" />
                  </h3>

                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-indigo-400/80 group-hover:text-indigo-300">
                  <span>Explore Subsystem</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. CALL TO ACTION FOOTER BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#0B0F1C] to-purple-950/40 border border-indigo-500/30 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
              Ready for Verifiable Analytics?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Launch the Query Workspace to translate queries, inspect mathematical LaTeX representations, and verify state receipts in real time.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('/workspace')}
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all active:scale-[0.98]"
            >
              <span>Launch Query Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/research')}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs sm:text-sm font-semibold border border-white/10 transition-all"
            >
              <span>Read Documentation</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
