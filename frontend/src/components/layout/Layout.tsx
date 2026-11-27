import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Footer } from './Footer';
import { LandingNavbar } from './LandingNavbar';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) {
    return (
      <div className="min-h-screen bg-[#07090E] flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        <LandingNavbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
