import React, { useEffect, useState } from 'react';
import {
  Network,
  Plus,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Layers,
  Code2
} from 'lucide-react';
import { api } from '../services/api';
import { SemanticRule, Metric } from '../types';

export const SemanticEngine: React.FC = () => {
  const [rules, setRules] = useState<SemanticRule[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Rule Form State
  const [newAlias, setNewAlias] = useState('');
  const [newConcept, setNewConcept] = useState('');
  const [newMetricId, setNewMetricId] = useState('TX-COUNT-001');

  useEffect(() => {
    Promise.all([api.getSemanticRules(), api.getMetrics()])
      .then(([rData, mData]) => {
        setRules(rData);
        setMetrics(mData);
      })
      .catch(err => console.error("Error loading semantic engine:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async (ruleId: string) => {
    try {
      const res = await api.toggleSemanticRule(ruleId);
      setRules(prev => prev.map(r => r.rule_id === ruleId ? { ...r, is_active: res.is_active } : r));
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlias.trim() || !newConcept.trim()) return;

    try {
      const ruleCount = rules.length + 1;
      const created = await api.createSemanticRule({
        rule_id: `RULE-CUSTOM-${String(ruleCount).padStart(2, '0')}`,
        phrase_pattern: newAlias,
        semantic_concept: newConcept,
        canonical_metric_id: newMetricId,
        confidence_score: 0.95,
        description: `Custom rule mapping "${newAlias}" to ${newMetricId}`,
        version: "1.0.0",
        is_active: true
      });
      setRules(prev => [created, ...prev]);
      setShowAddModal(false);
      setNewAlias('');
      setNewConcept('');
    } catch (err) {
      console.error("Create rule error:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Semantic Rule Engine</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Visualization of natural language to formal metric mappings.
        </p>
      </div>

      {/* Transformation Pathway Section matching Screenshot */}
      <div className="academic-card p-6 space-y-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Transformation Pathway
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Box 1: User Intent */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2 relative">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>USER INTENT</span>
            </div>
            <div className="text-sm font-bold text-slate-900">"Transaction Count"</div>
            <span className="badge-gray text-[9px] uppercase tracking-wider">RAW INPUT</span>
          </div>

          {/* Box 2: NLP Interpretation */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2 relative">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Network className="w-3.5 h-3.5 text-blue-600" />
              <span>NLP INTERPRETATION</span>
            </div>
            <div className="text-sm font-bold text-slate-900">"Number of Transactions"</div>
            <span className="badge-blue text-[9px] uppercase tracking-wider">SYNONYM RESOLVED</span>
          </div>

          {/* Box 3: Semantic Entity */}
          <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2 relative">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>SEMANTIC ENTITY</span>
            </div>
            <div className="text-sm font-bold text-slate-900">"Total Transfers"</div>
            <span className="badge-verified text-[9px] uppercase tracking-wider">ONTOLOGY MAPPED</span>
          </div>

          {/* Box 4: Formal Metric (Highlighted) */}
          <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50 space-y-2 relative">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-800">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>FORMAL METRIC</span>
            </div>
            <div className="text-xs font-mono font-bold text-blue-900 truncate">
              COUNT(transaction_hash)
            </div>
            <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-blue-600 text-white uppercase tracking-wider">
              EXECUTABLE SQL
            </span>
          </div>
        </div>
      </div>

      {/* Active Rule Dictionary Table matching Screenshot */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Rule Dictionary
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ontological mappings between natural language aliases and formal SQL expressions.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Rule</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-3">USER TERM (ALIAS)</th>
                <th className="pb-3 px-3">SEMANTIC CONCEPT</th>
                <th className="pb-3 px-3">TARGET METRIC (SQL)</th>
                <th className="pb-3 px-3">CONFIDENCE SCORE</th>
                <th className="pb-3 px-3 text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {rules.map((rule) => {
                const metricMatch = metrics.find(m => m.metric_id === rule.canonical_metric_id);
                const scorePercent = (rule.confidence_score * 100).toFixed(0);

                let barColor = "bg-emerald-500";
                if (rule.confidence_score < 0.7) barColor = "bg-red-500";
                else if (rule.confidence_score < 0.9) barColor = "bg-blue-500";

                return (
                  <tr key={rule.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-sans text-slate-800 font-medium max-w-xs truncate">
                      "{rule.phrase_pattern.split(',')[0].trim()}", ...
                    </td>
                    <td className="py-3 px-3 font-sans text-slate-600 font-medium">
                      {rule.semantic_concept}
                    </td>
                    <td className="py-3 px-3 text-blue-600 font-semibold">
                      {metricMatch?.formal_definition || rule.canonical_metric_id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${scorePercent}%` }}></div>
                        </div>
                        <span className="font-sans text-[11px] text-slate-600">{rule.confidence_score.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleToggle(rule.rule_id)}
                        className="inline-flex items-center gap-1 focus:outline-none"
                        title={rule.is_active ? "Rule Active" : "Rule Disabled"}
                      >
                        {rule.is_active ? (
                          <span className="badge-verified cursor-pointer">VERIFIED</span>
                        ) : (
                          <span className="badge-draft cursor-pointer">DISABLED</span>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Add Semantic Synonym Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">User Term / Natural Language Phrases</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., total transfers, count tx, how many sends"
                  value={newAlias}
                  onChange={(e) => setNewAlias(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Semantic Concept</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Cumulative Transfers"
                  value={newConcept}
                  onChange={(e) => setNewConcept(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Canonical Metric</label>
                <select
                  value={newMetricId}
                  onChange={(e) => setNewMetricId(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  {metrics.map(m => (
                    <option key={m.metric_id} value={m.metric_id}>
                      {m.metric_id} - {m.display_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs font-medium text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm transition-all"
                >
                  Register Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
