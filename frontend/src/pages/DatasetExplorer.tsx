import React, { useEffect, useState } from 'react';
import {
  Layers,
  Box,
  Users,
  Activity,
  Flame,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { Transaction } from '../types';

export const DatasetExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'transactions' | 'wallets' | 'contracts'>('transactions');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getTransactions({ limit: 50, search: searchTerm || undefined })
      .then(data => setTransactions(data))
      .catch(err => console.error("Error loading dataset:", err))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const getMethodBadgeClass = (method: string) => {
    switch (method.toLowerCase()) {
      case 'transfer':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'swap':
      case 'exactinputsingle':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'approve':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'mint':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'multicall':
      case 'unoswapto':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dataset Explorer</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Explore and analyze on-chain data with institutional precision.
        </p>
      </div>

      {/* Top 4 Stat Cards matching Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="academic-card p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">LATEST BLOCK</div>
          <div className="text-xl font-black text-slate-900 flex items-center justify-between">
            <span>19,543,210</span>
            <span className="text-[10px] font-medium text-emerald-600">+12s</span>
          </div>
        </div>

        <div className="academic-card p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TRANSACTIONS (24H)</div>
          <div className="text-xl font-black text-slate-900 flex items-center justify-between">
            <span>1.24M</span>
            <span className="text-[10px] font-medium text-emerald-600">+5.2%</span>
          </div>
        </div>

        <div className="academic-card p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ACTIVE WALLETS (24H)</div>
          <div className="text-xl font-black text-slate-900 flex items-center justify-between">
            <span>420,115</span>
            <span className="text-[10px] font-medium text-emerald-600">+1.1%</span>
          </div>
        </div>

        <div className="academic-card p-4 space-y-1">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">NETWORK GAS (AVG)</div>
          <div className="text-xl font-black text-slate-900 flex items-center justify-between">
            <span>24 Gwei</span>
            <span className="badge-verified text-[10px]">Optimal</span>
          </div>
        </div>
      </div>

      {/* Filter and Tab Navigation matching Screenshot */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          {(['blocks', 'transactions', 'wallets', 'contracts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-semibold px-4 py-1.5 rounded-md capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'contracts' ? 'Smart Contracts' : tab}
            </button>
          ))}
        </div>

        {/* Selectors and Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search tx hash, address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white w-48"
            />
          </div>

          <select className="text-xs py-1.5 px-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-slate-700">
            <option>Ethereum Mainnet</option>
            <option>Ganache Testnet</option>
          </select>

          <select className="text-xs py-1.5 px-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-slate-700">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>All Historical</option>
          </select>
        </div>
      </div>

      {/* Transactions Table matching Screenshot */}
      <div className="academic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3 w-10">Status</th>
                <th className="py-3 px-3">Tx Hash</th>
                <th className="py-3 px-3">Method</th>
                <th className="py-3 px-3">Block</th>
                <th className="py-3 px-3">Age</th>
                <th className="py-3 px-3">From</th>
                <th className="py-3 px-3">To</th>
                <th className="py-3 px-3 text-right">Value</th>
                <th className="py-3 px-3 text-right">Tx Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </td>
                  <td className="py-3 px-3 text-blue-600 font-medium">
                    {tx.tx_hash.slice(0, 6)}...{tx.tx_hash.slice(-4)}
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getMethodBadgeClass(tx.method_name)}`}>
                      {tx.transaction_type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-sans">{tx.block_number}</td>
                  <td className="py-3 px-3 text-slate-400 font-sans text-[10px]">12 secs ago</td>
                  <td className="py-3 px-3 text-slate-600">
                    {tx.sender.slice(0, 6)}...{tx.sender.slice(-4)}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {tx.receiver ? `${tx.receiver.slice(0, 6)}...${tx.receiver.slice(-4)}` : (
                      <span className="font-sans text-[10px] text-purple-600">Contract Deploy</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-semibold text-slate-900">
                    {tx.value > 0 ? `${tx.value.toFixed(2)} ETH` : '0 ETH'}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-500">
                    {tx.transaction_fee ? `${tx.transaction_fee.toFixed(4)} ETH` : '0.0012 ETH'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>Showing 1 to {transactions.length} of 1.24M records</div>
          <div className="flex items-center gap-2 font-semibold">
            <button className="p-1 rounded hover:bg-slate-100 text-slate-400 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold border border-blue-200">Page 1</span>
            <span>of 50,000+</span>
            <button className="p-1 rounded hover:bg-slate-100 text-slate-600">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
