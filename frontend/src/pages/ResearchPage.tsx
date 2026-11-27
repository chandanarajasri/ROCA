import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Network,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight
} from 'lucide-react';

export const ResearchPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-2">
      {/* Header Tag matching Screenshot */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider font-mono">
          RESEARCH INSIGHTS / VOL. 4, Q3 2024
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Formal Semantics in Blockchain Analytics
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          An empirical evaluation of ontology-driven query synthesis for on-chain data retrieval. This paper presents a structural framework minimizing hallucination rates in natural language-to-SQL translation models within the ROCA architecture.
        </p>
      </div>

      {/* Research Objectives & Architecture Flow matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Objectives Box */}
        <div className="academic-card p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Research Objectives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider mb-1">PRIMARY AIM</span>
                <p className="text-slate-600 leading-relaxed">
                  To establish a deterministic mapping protocol between informal natural language queries and strongly-typed blockchain relational schemas, reducing semantic drift during automated query generation.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 block uppercase text-[10px] tracking-wider mb-1">HYPOTHESIS</span>
                <p className="text-slate-600 leading-relaxed">
                  Injecting domain-specific ontological graphs into the prompt context window significantly outperforms fine-tuning standalone LLMs for highly technical on-chain metric requests.
                </p>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="flex flex-col justify-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 sm:pl-6 text-center sm:text-left">
              <div>
                <div className="text-3xl font-black text-blue-600">94.2%</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">TARGET ACCURACY RATE</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-800">&lt; 0.5s</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">LATENCY OVERHEAD LIMIT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture Vertical Flow Box */}
        <div className="academic-card p-6 flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Network className="w-4 h-4 text-blue-600" />
            <span>Architecture</span>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            The structural flow of the Semantic Engine processing a user request through the ontology graph before SQL synthesis.
          </p>

          <div className="space-y-2 py-1">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-700">
              1. NL INPUT
            </div>
            <div className="p-2.5 rounded bg-blue-50 border border-blue-200 text-center text-xs font-bold text-blue-700">
              2. ONTOLOGY MAP
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-center text-xs font-bold text-slate-700">
              3. GRAPH CONTEXT
            </div>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-700">
              4. SYNTHESIZED SQL
            </div>
          </div>
        </div>
      </div>

      {/* Formal Semantics Analysis: Advantages vs Limitations matching Screenshot */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 tracking-tight">
          <Zap className="w-4 h-4 text-blue-600" />
          <span>Formal Semantics: Comparative Analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Advantages */}
          <div className="academic-card p-6 space-y-4 border-emerald-200 bg-emerald-50/20">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ADVANTAGES</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>Deterministic Consistency</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  Guarantees identical outputs for semantically identical inputs, essential for institutional compliance and reproducible research.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>Reduced Hallucination</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  By constraining the solution space to the explicit ontology, structural hallucination drops by 87%.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-emerald-600">✓</span>
                  <span>Cross-Protocol Normalization</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  Provides a unified semantic layer over disparately structured protocols (e.g., Uniswap vs. Curve pool metrics).
                </p>
              </div>
            </div>
          </div>

          {/* Right: Limitations */}
          <div className="academic-card p-6 space-y-4 border-rose-200 bg-rose-50/20">
            <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>LIMITATIONS</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-rose-600">⚠</span>
                  <span>Ontological Rigidity</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  Novel DeFi primitives require manual engineering of new graph nodes before automated querying becomes reliable.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-rose-600">⚠</span>
                  <span>Maintenance Overhead</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  The ontology must be continuously updated as smart contract standards evolve, requiring dedicated data engineering teams.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span className="text-rose-600">⚠</span>
                  <span>Latency Spikes</span>
                </div>
                <p className="text-slate-600 pl-4 leading-relaxed">
                  Complex queries requiring deep graph traversal prior to generation can introduce 200-400ms of additional latency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology & Code Box matching Screenshot */}
      <div className="academic-card p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <Code2 className="w-4 h-4 text-blue-600" />
          <span>Methodology & Implementation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
            <p>
              The implementation relies on an RDF-based triple store holding the blockchain schema ontology. When a natural language request is received, an initial lightweight embedding matches the intent to relevant ontology nodes.
            </p>
            <p>
              These nodes, along with their strict typing definitions and relationship edges, are injected as context into the prompt template for the primary SQL synthesis model.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="badge-gray text-[10px]">SPARQL</span>
              <span className="badge-gray text-[10px]">RDF</span>
              <span className="badge-gray text-[10px]">AST Engine</span>
            </div>
          </div>

          {/* Code snippet block matching Screenshot */}
          <div className="bg-[#0F172A] text-emerald-400 p-4 rounded-lg text-xs font-mono border border-slate-800 overflow-x-auto">
            <div className="text-slate-500 text-[10px] pb-2 border-b border-slate-800 mb-2 font-mono">
              ONTOLOGY_CONTEXT_INJECTOR.PY
            </div>
            <pre className="leading-relaxed">
              {`def build_semantic_context(query: str, graph: Graph) -> str:
    """Retrieves localized schema definitions."""
    entities = extract_entities(query)
    context_triples = []
    
    for entity in entities:
        # Match entity to ontology node
        node = graph.search(entity, threshold=0.85)
        if node:
            edges = graph.get_adjacent(node, depth=2)
            context_triples.extend(format_triples(edges))
            
    return format_for_llm(context_triples)`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
