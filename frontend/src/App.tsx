import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { QueryWorkspace } from './pages/QueryWorkspace';
import { SemanticEngine } from './pages/SemanticEngine';
import { MetricRepository } from './pages/MetricRepository';
import { QueryGenerator } from './pages/QueryGenerator';
import { DatasetExplorer } from './pages/DatasetExplorer';
import { ValidationPage } from './pages/ValidationPage';
import { ReportsPage } from './pages/ReportsPage';
import { ReportDetailPage } from './pages/ReportDetailPage';
import { ResearchPage } from './pages/ResearchPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="workspace" element={<QueryWorkspace />} />
          <Route path="semantic-engine" element={<SemanticEngine />} />
          <Route path="metric-repository" element={<MetricRepository />} />
          <Route path="query-generator" element={<QueryGenerator />} />
          <Route path="dataset-explorer" element={<DatasetExplorer />} />
          <Route path="validation" element={<ValidationPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/:id" element={<ReportDetailPage />} />
          <Route path="research" element={<ResearchPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
