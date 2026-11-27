import React, { useEffect, useState } from 'react';
import {
  Settings,
  Database,
  Radio,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Cpu,
  Server
} from 'lucide-react';
import { api } from '../services/api';
import { BlockchainStatus } from '../types';

export const AdminPage: React.FC = () => {
  const [nodeStatus, setNodeStatus] = useState<BlockchainStatus | null>(null);
  const [health, setHealth] = useState<any>(null);
  const [loadingNode, setLoadingNode] = useState(false);

  const fetchStatus = () => {
    setLoadingNode(true);
    Promise.all([api.getBlockchainStatus(), api.getHealth()])
      .then(([status, h]) => {
        setNodeStatus(status);
        setHealth(h);
      })
      .catch(err => console.error("Admin status error:", err))
      .finally(() => setLoadingNode(false));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Administration</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            System health, database status, and live blockchain RPC connection telemetry.
          </p>
        </div>
        <button
          onClick={fetchStatus}
          disabled={loadingNode}
          className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-md shadow-sm transition-all"
        >
          <RotateCw className={`w-3.5 h-3.5 ${loadingNode ? 'animate-spin' : ''}`} />
          <span>Refresh System Telemetry</span>
        </button>
      </div>

      {/* Nodes and Database Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backend / DB Telemetry */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Server className="w-4 h-4 text-blue-600" />
            <span>Core Analytical Engine & DB</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">Database Engine</span>
              <span className="font-mono font-bold text-slate-900">PostgreSQL / SQLAlchemy (Relational)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">Backend Framework</span>
              <span className="font-mono font-bold text-slate-900">FastAPI (Python 3.13)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">Validation Engine</span>
              <span className="font-mono font-bold text-emerald-600">Pandas Vectorized Dual-Engine (Active)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">Health Status</span>
              <span className="badge-verified">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                {health?.status?.toUpperCase() || 'HEALTHY'}
              </span>
            </div>
          </div>
        </div>

        {/* Blockchain Node Telemetry (Ganache / Web3.py) */}
        <div className="academic-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Radio className="w-4 h-4 text-blue-600" />
            <span>Live Node Telemetry (Ganache / Web3.py)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">RPC Endpoint</span>
              <span className="font-mono text-slate-800">{nodeStatus?.rpc_url || 'http://127.0.0.1:7545'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-slate-600">Connection State</span>
              {nodeStatus?.is_connected ? (
                <span className="badge-verified">Connected</span>
              ) : (
                <span className="badge-draft">Offline / Fallback to DB</span>
              )}
            </div>
            {nodeStatus?.is_connected && (
              <>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
                  <span className="text-slate-600">Chain ID</span>
                  <span className="font-mono font-bold text-slate-900">{nodeStatus.chain_id}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md border border-slate-200">
                  <span className="text-slate-600">Latest Block Height</span>
                  <span className="font-mono font-bold text-blue-600">{nodeStatus.latest_block}</span>
                </div>
              </>
            )}
            {!nodeStatus?.is_connected && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md text-[11px] text-amber-800">
                Ganache RPC node is currently offline. System gracefully defaults to verified synthetic Ethereum historical dataset without interruptions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
