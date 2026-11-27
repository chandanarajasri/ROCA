import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  ArrowRight,
  Database,
  Search,
  CheckCircle2,
  Cpu,
  Sparkles,
  Share2,
  Wallet,
  Box,
  FileCode2,
  Activity
} from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'block' | 'wallet' | 'tx' | 'query' | 'result';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  details: {
    addressOrHash?: string;
    transactions?: number | string;
    volume?: string;
    gasUsed?: string;
    blockNumber?: number;
    status?: string;
    executionTime?: string;
    proofHash?: string;
  };
  connectedTo: string[];
}

export const InteractiveNetworkVisualizer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'block' | 'wallet' | 'tx' | 'query' | 'result'>('all');
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initial rich blockchain telemetry nodes
  const initialNodes: NetworkNode[] = [
    {
      id: 'node-block-1',
      label: 'Block #18492100',
      sublabel: 'Ethereum Block',
      type: 'block',
      x: 180,
      y: 120,
      vx: 0.1,
      vy: 0.1,
      radius: 24,
      color: '#6366F1',
      details: {
        blockNumber: 18492100,
        transactions: 148,
        volume: '42.8 ETH',
        gasUsed: '14,892,104'
      },
      connectedTo: ['node-wallet-1', 'node-tx-1', 'node-tx-2']
    },
    {
      id: 'node-block-2',
      label: 'Block #18492105',
      sublabel: 'Ethereum Block',
      type: 'block',
      x: 620,
      y: 110,
      vx: -0.1,
      vy: 0.15,
      radius: 24,
      color: '#6366F1',
      details: {
        blockNumber: 18492105,
        transactions: 182,
        volume: '68.4 ETH',
        gasUsed: '15,200,430'
      },
      connectedTo: ['node-wallet-2', 'node-tx-3', 'node-query-1']
    },
    {
      id: 'node-wallet-1',
      label: 'Whale 0x7A3...91F',
      sublabel: 'Liquidity Provider',
      type: 'wallet',
      x: 130,
      y: 310,
      vx: 0.15,
      vy: -0.1,
      radius: 20,
      color: '#38BDF8',
      details: {
        addressOrHash: '0x7A3c9F82B3e...91F84c',
        transactions: 1284,
        volume: '428.6 ETH',
        status: 'Active'
      },
      connectedTo: ['node-block-1', 'node-tx-1', 'node-wallet-2']
    },
    {
      id: 'node-wallet-2',
      label: 'Uniswap V3 Router',
      sublabel: 'Smart Contract',
      type: 'wallet',
      x: 400,
      y: 260,
      vx: -0.08,
      vy: 0.08,
      radius: 28,
      color: '#EC4899',
      details: {
        addressOrHash: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        transactions: '48.9K',
        volume: '14,890.5 ETH',
        status: 'Verified Contract'
      },
      connectedTo: ['node-wallet-1', 'node-tx-2', 'node-tx-3', 'node-query-1']
    },
    {
      id: 'node-tx-1',
      label: 'Tx 0x8f4...f90',
      sublabel: 'Value Transfer',
      type: 'tx',
      x: 270,
      y: 200,
      vx: 0.12,
      vy: -0.15,
      radius: 16,
      color: '#A855F7',
      details: {
        addressOrHash: '0x8f4d5a2b1c3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f90',
        volume: '5.00 ETH',
        gasUsed: '21,000',
        status: 'SUCCESS'
      },
      connectedTo: ['node-block-1', 'node-wallet-1', 'node-wallet-2']
    },
    {
      id: 'node-tx-2',
      label: 'Tx 0x3e1...4c6',
      sublabel: 'Swap exactInput',
      type: 'tx',
      x: 290,
      y: 380,
      vx: -0.12,
      vy: -0.05,
      radius: 16,
      color: '#A855F7',
      details: {
        addressOrHash: '0x3e1a7c90b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6',
        volume: '12.50 ETH',
        gasUsed: '145,000',
        status: 'SUCCESS'
      },
      connectedTo: ['node-wallet-2', 'node-query-1']
    },
    {
      id: 'node-tx-3',
      label: 'Tx 0x7e2...0e2a',
      sublabel: 'Flash Swap',
      type: 'tx',
      x: 520,
      y: 210,
      vx: -0.1,
      vy: 0.1,
      radius: 16,
      color: '#A855F7',
      details: {
        addressOrHash: '0x7e2d4a6b8c0e2a4c6e8a0b2d4f6a8c0e2a4b6d8e0f2a4c6e8a0b2d4f6a8c0e2a',
        volume: '24.80 ETH',
        gasUsed: '210,400',
        status: 'SUCCESS'
      },
      connectedTo: ['node-block-2', 'node-wallet-2', 'node-query-1']
    },
    {
      id: 'node-query-1',
      label: 'Formal Query (AST)',
      sublabel: 'SUM(transaction_value)',
      type: 'query',
      x: 610,
      y: 340,
      vx: 0.08,
      vy: -0.08,
      radius: 26,
      color: '#3B82F6',
      details: {
        addressOrHash: 'TX-VOLUME-001 :: AST[SUM(v)]',
        transactions: 'All Verified',
        volume: '16.30 ETH Aggregate',
        status: 'Compiled SQL'
      },
      connectedTo: ['node-block-2', 'node-tx-2', 'node-tx-3', 'node-result-1']
    },
    {
      id: 'node-result-1',
      label: 'Reproducible Seal',
      sublabel: 'SHA-256 Verified',
      type: 'result',
      x: 760,
      y: 250,
      vx: -0.05,
      vy: -0.1,
      radius: 22,
      color: '#10B981',
      details: {
        proofHash: '73977599272be3aa838254f4402691c7cbeb77fe4f1f76769e6d839c9a254e0f',
        volume: '16.30 ETH',
        executionTime: '5.94 ms',
        status: '100% REPRODUCIBLE'
      },
      connectedTo: ['node-query-1']
    }
  ];

  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);

  // Slow organic drift animation for network nodes
  useEffect(() => {
    let animId: number;
    const animate = () => {
      setNodes(prev =>
        prev.map(node => {
          let nx = node.x + node.vx * 0.4;
          let ny = node.y + node.vy * 0.4;

          // Gentle bounding box
          if (nx < 80 || nx > 820) node.vx *= -1;
          if (ny < 80 || ny > 420) node.vy *= -1;

          return { ...node, x: nx, y: ny };
        })
      );
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const displayedNode = hoveredNode || selectedNode || nodes[2];

  const isConnected = (id1: string, id2: string) => {
    const n1 = nodes.find(n => n.id === id1);
    const n2 = nodes.find(n => n.id === id2);
    if (!n1 || !n2) return false;
    return n1.connectedTo.includes(id2) || n2.connectedTo.includes(id1);
  };

  const isHighlighted = (nodeId: string) => {
    if (!hoveredNode) return true;
    if (hoveredNode.id === nodeId) return true;
    return isConnected(hoveredNode.id, nodeId);
  };

  return (
    <div className="w-full relative roca-dark-card p-6 sm:p-8 overflow-hidden">
      {/* Visual Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
              Live Topology Graph
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 font-heading">
            On-Chain Entity & Query Semantics Network
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
          {(['all', 'block', 'wallet', 'tx', 'query', 'result'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1 rounded-md capitalize font-medium transition-all ${
                activeFilter === tab
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab === 'tx' ? 'Transactions' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Canvas / SVG Area */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] sm:h-[480px] mt-4 rounded-xl bg-gradient-to-b from-black/60 to-[#0A0D14]/80 border border-white/5 overflow-hidden select-none"
      >
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>

        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {nodes.map(n1 =>
            n1.connectedTo.map(targetId => {
              const n2 = nodes.find(n => n.id === targetId);
              if (!n2) return null;
              const highlighted = isHighlighted(n1.id) && isHighlighted(n2.id);

              return (
                <g key={`${n1.id}-${n2.id}`}>
                  <line
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={highlighted ? (hoveredNode ? '#818CF8' : 'url(#edgeGrad)') : 'rgba(255,255,255,0.06)'}
                    strokeWidth={highlighted ? 1.8 : 0.8}
                    strokeDasharray={highlighted ? '4 4' : 'none'}
                    className={highlighted ? 'animate-dash-flow' : ''}
                    opacity={highlighted ? 0.9 : 0.25}
                  />
                </g>
              );
            })
          )}
        </svg>

        {/* Interactive HTML Nodes */}
        {nodes.map(node => {
          const visible = activeFilter === 'all' || node.type === activeFilter;
          const highlighted = isHighlighted(node.id);
          const isSelected = displayedNode.id === node.id;

          if (!visible) return null;

          return (
            <div
              key={node.id}
              style={{
                left: `${node.x}px`,
                top: `${node.y}px`,
                transform: 'translate(-50%, -50%)',
                borderColor: node.color
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
              className={`absolute cursor-pointer transition-all duration-300 rounded-full flex items-center justify-center ${
                highlighted ? 'opacity-100 scale-100' : 'opacity-30 scale-90'
              } ${isSelected ? 'ring-4 ring-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.6)]' : 'hover:scale-110 shadow-lg'}`}
            >
              {/* Inner Node Body */}
              <div
                style={{
                  width: `${node.radius * 2}px`,
                  height: `${node.radius * 2}px`,
                  backgroundColor: isSelected ? node.color : '#0B0F19',
                  border: `2px solid ${node.color}`
                }}
                className="rounded-full flex items-center justify-center relative group"
              >
                {node.type === 'block' && <Box className="w-3.5 h-3.5 text-white" />}
                {node.type === 'wallet' && <Wallet className="w-3.5 h-3.5 text-white" />}
                {node.type === 'tx' && <Activity className="w-3 h-3 text-white" />}
                {node.type === 'query' && <FileCode2 className="w-3.5 h-3.5 text-white" />}
                {node.type === 'result' && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}

                {/* Pulsing ring on hover/selected */}
                {highlighted && (
                  <span
                    style={{ borderColor: node.color }}
                    className="absolute -inset-1 rounded-full border animate-ping opacity-25 pointer-events-none"
                  ></span>
                )}
              </div>

              {/* Node label underneath */}
              <span className="absolute top-full mt-1.5 text-[10px] font-mono whitespace-nowrap text-slate-300 bg-black/70 px-1.5 py-0.5 rounded border border-white/10 pointer-events-none">
                {node.label}
              </span>
            </div>
          );
        })}

        {/* Dynamic Telemetry Tooltip Overlay in Corner */}
        {displayedNode && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-[#0B0F19]/95 backdrop-blur-md p-4 rounded-xl border border-indigo-500/30 shadow-2xl z-20 animate-fade-up">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div
                  style={{ backgroundColor: displayedNode.color }}
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]"
                ></div>
                <span className="text-xs font-bold text-white tracking-tight">
                  {displayedNode.label}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-indigo-300">
                {displayedNode.sublabel}
              </span>
            </div>

            {/* Telemetry Metrics */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 text-xs">
              {displayedNode.details.transactions !== undefined && (
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Transactions</span>
                  <div className="font-bold text-slate-100 font-mono">
                    {displayedNode.details.transactions.toLocaleString()}
                  </div>
                </div>
              )}

              {displayedNode.details.volume && (
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Volume</span>
                  <div className="font-bold text-emerald-400 font-mono">
                    {displayedNode.details.volume}
                  </div>
                </div>
              )}

              {displayedNode.details.addressOrHash && (
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Address / Hash</span>
                  <div className="font-mono text-[11px] text-indigo-300 truncate bg-black/40 p-1.5 rounded border border-white/5">
                    {displayedNode.details.addressOrHash}
                  </div>
                </div>
              )}

              {displayedNode.details.proofHash && (
                <div className="col-span-2">
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Cryptographic State Seal</span>
                  <div className="font-mono text-[10px] text-emerald-400 truncate bg-emerald-950/40 p-1.5 rounded border border-emerald-500/30">
                    {displayedNode.details.proofHash}
                  </div>
                </div>
              )}

              {displayedNode.details.status && (
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-mono">State Status</span>
                  <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{displayedNode.details.status}</span>
                  </div>
                </div>
              )}

              {displayedNode.details.executionTime && (
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-mono">Verification Speed</span>
                  <div className="text-[11px] font-mono text-cyan-400 font-bold">
                    {displayedNode.details.executionTime}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Connected to {displayedNode.connectedTo.length} network entities</span>
              <span className="text-indigo-400 font-medium cursor-pointer hover:underline">Inspect Node →</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
