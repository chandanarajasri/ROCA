import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Users,
  Coins,
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';

export const AnalyticsTelemetryDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  // Animated counters
  const [txCount, setTxCount] = useState(0);
  const [volume, setVolume] = useState(0);
  const [wallets, setWallets] = useState(0);
  const [queries, setQueries] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasEntered) {
          setHasEntered(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered) return;

    // Smooth count-up animation
    const duration = 1800; // ms
    const startTime = performance.now();

    const animateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setTxCount(parseFloat((ease * 15.8).toFixed(1)));
      setVolume(parseFloat((ease * 8.42).toFixed(2)));
      setWallets(Math.floor(ease * 284));
      setQueries(parseFloat((ease * 92.4).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };

    requestAnimationFrame(animateCounters);
  }, [hasEntered]);

  const throughputData = [
    { time: '00:00', txs: 340, volume: 18.2 },
    { time: '04:00', txs: 480, volume: 24.5 },
    { time: '08:00', txs: 690, volume: 48.0 },
    { time: '12:00', txs: 920, volume: 72.4 },
    { time: '16:00', txs: 850, volume: 64.1 },
    { time: '20:00', txs: 780, volume: 55.8 },
    { time: '24:00', txs: 610, volume: 42.9 }
  ];

  return (
    <div ref={containerRef} className="w-full relative roca-dark-card p-6 sm:p-10 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-3">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>Macro Research Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-heading">
            INSTITUTIONAL METRICS.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 font-light">
            Continuous verification and historical telemetry benchmarked across high-throughput EVM blocks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-Time Indexing active</span>
        </div>
      </div>

      {/* 4 Animated KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {/* KPI 1 */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
            <span>Total Transactions</span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-heading">
            {txCount.toFixed(1)}M+
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono pt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.2% verified throughput</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
            <span>Transaction Volume</span>
            <Coins className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-heading">
            {volume.toFixed(2)}M <span className="text-xl font-normal text-slate-400">ETH</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono pt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Exact mathematical sum</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
            <span>Active Wallets</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-heading">
            {wallets}K+
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Unique sender clusters</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-indigo-500/40 transition-all space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono uppercase tracking-wider">
            <span>Queries Executed</span>
            <FileCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white font-heading">
            {queries.toFixed(1)}K
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Cryptographic Seals</span>
          </div>
        </div>
      </div>

      {/* Chart Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main 24h Verified Throughput Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                Analytical Throughput & Volume Flow
              </h4>
              <p className="text-xs text-slate-400">Continuous 24-hour verifiable pipeline execution</p>
            </div>
            <span className="badge-dark-pill text-[10px]">Dual Engine Sync</span>
          </div>

          <div className="h-56 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorTx" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#334155', borderRadius: 8, fontSize: 12, color: '#FFF' }}
                />
                <Area type="monotone" dataKey="txs" stroke="#818CF8" strokeWidth={2} fillOpacity={1} fill="url(#colorTx)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Panel: Gas Telemetry & Node Specs */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
              Computational Bounds
            </span>

            <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Avg Verification Latency</span>
                <span className="text-emerald-400 font-mono font-bold">5.94 ms</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="w-4/5 h-full bg-emerald-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Statistical Exactness</span>
                <span className="text-cyan-400 font-mono font-bold">&le; 10⁻⁶ ETH</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="w-full h-full bg-cyan-500 rounded-full"></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B0F19] border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>State Seal Coverage</span>
                <span className="text-indigo-400 font-mono font-bold">100% Deterministic</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="w-full h-full bg-indigo-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
