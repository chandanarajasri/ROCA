import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return (
      <footer className="border-t border-white/10 bg-[#06080D] py-12 px-6 sm:px-12 text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-300">ROCA Framework</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">A Framework for Reproducible On-Chain Analytics through Formal Query Semantics</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <Link to="/workspace" className="hover:text-white transition-colors">Query Workspace</Link>
            <Link to="/metric-repository" className="hover:text-white transition-colors">Metric Repository</Link>
            <Link to="/validation" className="hover:text-white transition-colors">Dual Engine</Link>
            <Link to="/reports" className="hover:text-white transition-colors">Reproducibility</Link>
            <Link to="/research" className="hover:text-white transition-colors">Research Paper</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-200/80 bg-white py-4 px-6 sm:px-12 text-[11px] sm:text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
      <div className="flex items-center gap-2 text-slate-600 font-medium">
        <span>© 2024 Blockchain Research Lab. Institutional Scale Analytics.</span>
      </div>
      <div className="flex items-center gap-6 text-slate-500">
        <Link to="/research" className="hover:text-blue-600 transition-colors">Documentation</Link>
        <Link to="/workspace" className="hover:text-blue-600 transition-colors">Workspace</Link>
        <Link to="/reports" className="hover:text-blue-600 transition-colors">Reports</Link>
      </div>
    </footer>
  );
};
