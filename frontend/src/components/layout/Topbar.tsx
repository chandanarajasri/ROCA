import React from 'react';
import { Search, Moon, Bell, User, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopbarProps {
  onSearch?: (query: string) => void;
  isLanding?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({ onSearch, isLanding = false }) => {
  if (isLanding) {
    return (
      <header className="h-14 sm:h-16 bg-white border-b border-slate-200/80 px-6 sm:px-12 flex items-center justify-between sticky top-0 z-30">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
            ROCA Analytics
          </span>
        </Link>

        {/* Right Actions matching Screenshot */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            title="Toggle Theme"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Moon className="w-4 h-4" />
          </button>
          <button
            title="Notifications"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
          </button>
          <button
            title="Account"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-10">
      {/* Search Input matching Institutional Screenshot */}
      <div className="flex items-center gap-2 w-96 max-w-md bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search metrics, datasets, SQL..."
          onChange={(e) => onSearch && onSearch(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Brand Title Centered or Right */}
      <Link to="/" className="text-sm font-semibold text-slate-800 tracking-tight flex items-center gap-2">
        <span>ROCA Analytics</span>
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
          <ShieldCheck className="w-3 h-3" />
          Reproducible
        </span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          title="Toggle Theme"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Moon className="w-4 h-4" />
        </button>
        <button
          title="Notifications"
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute top-2 right-2"></span>
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-semibold overflow-hidden border border-slate-300">
            <span>EV</span>
          </div>
        </div>
      </div>
    </header>
  );
};
