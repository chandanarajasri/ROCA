import React, { useEffect, useState } from 'react';
import {
  Database,
  Filter,
  Download,
  CheckCircle2,
  Code2,
  Layers,
  Search,
  Plus
} from 'lucide-react';
import { api } from '../services/api';
import { Metric } from '../types';

export const MetricRepository: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMetrics()
      .then(data => setMetrics(data))
      .catch(err => console.error("Error loading metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredMetrics = metrics.filter(m => {
    const matchesSearch =
      m.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.metric_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportRegistryJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ROCA_Metric_Registry.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Metric Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Authoritative definitions, formulas, and verified SQL representations for standardized on-chain analytics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportRegistryJson}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-md shadow-sm transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Registry</span>
          </button>
        </div>
      </div>

      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs font-bold text-slate-600">
          {filteredMetrics.length} Metrics Found
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs py-1.5 px-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
          >
            <option value="ALL">All Categories</option>
            <option value="Network Activity">Network Activity</option>
            <option value="Core Volume">Core Volume</option>
            <option value="User Engagement">User Engagement</option>
            <option value="Network Telemetry">Network Telemetry</option>
            <option value="DeFi & Protocols">DeFi & Protocols</option>
          </select>
        </div>
      </div>

      {/* Metric Definitions Table matching Screenshot */}
      <div className="academic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 w-48">Metric Name</th>
                <th className="py-3 px-4 w-64">Description</th>
                <th className="py-3 px-4 w-52">Formula / Logic</th>
                <th className="py-3 px-4">SQL Representation</th>
                <th className="py-3 px-4 w-32">Blockchain Equivalent</th>
                <th className="py-3 px-4 w-20 text-right">Version</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMetrics.map((metric) => {
                const isVerified = metric.status === 'VERIFIED';
                return (
                  <tr key={metric.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Name & Badge */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-slate-900 leading-tight">
                        {metric.display_name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {metric.metric_id}
                      </div>
                      <div className="mt-1.5">
                        {isVerified ? (
                          <span className="badge-verified">VERIFIED</span>
                        ) : (
                          <span className="badge-draft">DRAFT</span>
                        )}
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-4 align-top text-slate-600 leading-relaxed font-sans text-xs">
                      {metric.description}
                    </td>

                    {/* Formula / Logic */}
                    <td className="py-4 px-4 align-top font-mono text-[11px] text-slate-700 bg-slate-50/30">
                      <div className="font-semibold text-blue-900">{metric.formal_definition}</div>
                      {metric.latex_formula && (
                        <div className="text-[10px] text-slate-400 mt-1 italic">{metric.latex_formula}</div>
                      )}
                    </td>

                    {/* SQL Box */}
                    <td className="py-4 px-4 align-top">
                      <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-tight border border-slate-800">
                        <code>{metric.sql_template}</code>
                      </pre>
                    </td>

                    {/* Blockchain Equivalent */}
                    <td className="py-4 px-4 align-top font-mono text-[11px] text-slate-600">
                      <div className="bg-slate-100 px-2 py-1 rounded text-[10px] text-slate-700 mb-1">
                        Ethereum: {metric.canonical_name.includes('gas') ? 'gas_used' : 'from/to'}
                      </div>
                    </td>

                    {/* Version */}
                    <td className="py-4 px-4 align-top text-right font-mono text-slate-500 font-medium">
                      v{metric.version}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
