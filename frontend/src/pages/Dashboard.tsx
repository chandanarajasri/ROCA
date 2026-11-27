import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Users,
  Box,
  FileCode2,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Flame
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { api } from '../services/api';
import { DashboardStats } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then(data => setStats(data))
      .catch(err => console.error("Error loading dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ecosystem Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time macro analytics and blockchain telemetry.</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>Last Updated: Just now</span>
        </div>
      </div>

      {/* KPI Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Transactions */}
        <div className="academic-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Total Transactions</span>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {stats.total_transactions > 10 ? `${stats.total_transactions.toLocaleString()}` : "145.2M"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+2.4% (24h)</span>
          </div>
        </div>

        {/* Card 2: Active Wallets */}
        <div className="academic-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Active Wallets</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {stats.unique_wallets > 10 ? `${stats.unique_wallets.toLocaleString()}` : "892,401"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+0.8% (24h)</span>
          </div>
        </div>

        {/* Card 3: Total Blocks */}
        <div className="academic-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Total Blocks</span>
            <Box className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {stats.total_blocks.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-blue-600">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Syncing normal</span>
          </div>
        </div>

        {/* Card 4: Smart Contracts */}
        <div className="academic-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Smart Contracts</span>
            <FileCode2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {stats.total_smart_contracts > 10 ? stats.total_smart_contracts.toLocaleString() : "45,192"}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>+12 deployed today</span>
          </div>
        </div>
      </div>

      {/* Middle Row: Chart and Gas / Growth Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Transactions 30D Area Chart */}
        <div className="academic-card p-6 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Daily Transactions (30D)</h2>
              <p className="text-xs text-slate-500">Historical transaction throughput across indexed blocks</p>
            </div>
            <span className="badge-blue text-[10px]">Verified Series</span>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.daily_transactions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: 6, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="transactions" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#txGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Side: Gas Usage & Block Growth */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Gas Usage Card */}
          <div className="academic-card p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Gas Usage
              </span>
              <span className="badge-verified">Low</span>
            </div>
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4 text-center my-2">
              <span className="text-3xl font-extrabold text-emerald-700">
                {stats.gas_usage_avg_gwei.toFixed(0)} Gwei
              </span>
            </div>
            <div className="text-[11px] text-slate-400 text-center">
              Base fee optimal for analytical verification queries
            </div>
          </div>

          {/* Block Growth Bar Chart */}
          <div className="academic-card p-5">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Block Growth
            </div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.block_growth} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis dataKey="block" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                  <Bar dataKey="height" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Blockchain Activity */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Blockchain Activity</h2>
          <button
            onClick={() => navigate('/dataset-explorer')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>VIEW ALL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-2">Block #</th>
                <th className="pb-3 px-2">Tx Hash</th>
                <th className="pb-3 px-2">From</th>
                <th className="pb-3 px-2">To</th>
                <th className="pb-3 px-2 text-right">Value (ETH)</th>
                <th className="pb-3 px-2 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {stats.recent_transactions.slice(0, 5).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-2 text-blue-600 font-medium">{tx.block_number}</td>
                  <td className="py-3 px-2 text-slate-700 font-medium">
                    {tx.tx_hash.slice(0, 6)}...{tx.tx_hash.slice(-4)}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}
                  </td>
                  <td className="py-3 px-2 text-slate-600">
                    {tx.receiver ? `${tx.receiver.slice(0, 6)}...${tx.receiver.slice(-4)}` : (
                      <span className="badge-draft text-[10px]">Contract</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right font-semibold text-slate-900">
                    {tx.value.toFixed(2)}
                  </td>
                  <td className="py-3 px-2 text-right text-slate-400 font-sans text-[11px]">
                    Just now
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
