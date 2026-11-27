import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  Search
} from 'lucide-react';
import { api } from '../services/api';
import { ReportSummary } from '../types';

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getReports()
      .then(data => setReports(data))
      .catch(err => console.error("Error loading reports:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredReports = reports.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.report_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reproducibility Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable, audit-ready analytical proofs and execution receipts.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search report ID or query..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Reports List Cards / Table */}
      <div className="academic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Report ID</th>
                <th className="py-3 px-4">Analysis / Natural Query</th>
                <th className="py-3 px-4">Metric</th>
                <th className="py-3 px-4 text-right">Computed Result</th>
                <th className="py-3 px-4 text-center">Validation</th>
                <th className="py-3 px-4 text-right">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredReports.map((report) => (
                <tr key={report.report_id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-blue-600">
                    {report.report_id}
                  </td>
                  <td className="py-4 px-4 max-w-sm">
                    <div className="font-semibold text-slate-900 leading-snug">{report.title}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5 italic">"{report.query}"</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700">
                    {report.metric}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                    {report.result.toLocaleString(undefined, { minimumFractionDigits: 2 })} {report.unit}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="badge-verified">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {report.validation_status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-slate-400 text-[11px]">
                    {new Date(report.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/reports/${report.report_id}`)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <a
                        href={api.getReportPdfUrl(report.report_id)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        title="Download PDF"
                        download
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    </div>
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
