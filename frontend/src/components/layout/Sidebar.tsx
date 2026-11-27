import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Terminal,
  Network,
  Database,
  Code2,
  Layers,
  CheckCircle2,
  FileText,
  BookOpen,
  Settings,
  Plus
} from 'lucide-react';

interface SidebarProps {
  onNewAnalysis?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNewAnalysis }) => {
  const navigate = useNavigate();

  const handleNewAnalysis = () => {
    if (onNewAnalysis) {
      onNewAnalysis();
    }
    navigate('/workspace');
  };

  const navSectionClass = "px-4 pt-5 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase";
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors duration-150 ${
      isActive
        ? 'text-blue-600 bg-blue-50/70 border-r-2 border-blue-600 font-semibold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
    }`;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
          R
        </div>
        <div>
          <div className="font-bold text-slate-900 leading-none text-base tracking-tight">ROCA</div>
          <div className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-0.5">Institutional Modern</div>
        </div>
      </div>

      {/* New Analysis Action Button */}
      <div className="p-3">
        <button
          onClick={handleNewAnalysis}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs py-2.5 px-4 rounded-md flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 pb-6">
        {/* OVERVIEW */}
        <div className={navSectionClass}>Overview</div>
        <NavLink to="/" className={navLinkClass}>
          <Home className="w-4 h-4" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/dashboard" className={navLinkClass}>
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>

        {/* ANALYTICS */}
        <div className={navSectionClass}>Analytics</div>
        <NavLink to="/workspace" className={navLinkClass}>
          <Terminal className="w-4 h-4" />
          <span>Query Workspace</span>
        </NavLink>
        <NavLink to="/semantic-engine" className={navLinkClass}>
          <Network className="w-4 h-4" />
          <span>Semantic Engine</span>
        </NavLink>
        <NavLink to="/metric-repository" className={navLinkClass}>
          <Database className="w-4 h-4" />
          <span>Metric Repository</span>
        </NavLink>
        <NavLink to="/query-generator" className={navLinkClass}>
          <Code2 className="w-4 h-4" />
          <span>Query Generator</span>
        </NavLink>

        {/* DATA */}
        <div className={navSectionClass}>Data</div>
        <NavLink to="/dataset-explorer" className={navLinkClass}>
          <Layers className="w-4 h-4" />
          <span>Dataset Explorer</span>
        </NavLink>

        {/* VERIFICATION */}
        <div className={navSectionClass}>Verification</div>
        <NavLink to="/validation" className={navLinkClass}>
          <CheckCircle2 className="w-4 h-4" />
          <span>Validation</span>
        </NavLink>

        {/* OUTPUT */}
        <div className={navSectionClass}>Output</div>
        <NavLink to="/reports" className={navLinkClass}>
          <FileText className="w-4 h-4" />
          <span>Reports</span>
        </NavLink>

        {/* RESEARCH */}
        <div className={navSectionClass}>Research</div>
        <NavLink to="/research" className={navLinkClass}>
          <BookOpen className="w-4 h-4" />
          <span>Research</span>
        </NavLink>

        {/* SYSTEM */}
        <div className={navSectionClass}>System</div>
        <NavLink to="/admin" className={navLinkClass}>
          <Settings className="w-4 h-4" />
          <span>Admin</span>
        </NavLink>
      </nav>
    </aside>
  );
};
