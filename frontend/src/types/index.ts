export interface Metric {
  id: number;
  metric_id: string;
  canonical_name: string;
  display_name: string;
  category: string;
  description: string;
  formal_definition: string;
  latex_formula?: string;
  sql_template: string;
  web3_template?: string;
  unit: string;
  required_columns: string;
  version: string;
  status: 'VERIFIED' | 'DRAFT' | 'EXPERIMENTAL';
  created_at: string;
}

export interface SemanticRule {
  id: number;
  rule_id: string;
  phrase_pattern: string;
  semantic_concept: string;
  canonical_metric_id: string;
  confidence_score: number;
  description?: string;
  version: string;
  is_active: boolean;
  created_at: string;
}

export interface Transaction {
  id: number;
  tx_hash: string;
  block_number: number;
  timestamp: string;
  sender: string;
  receiver?: string;
  value: number;
  gas_used: number;
  gas_price: number;
  transaction_fee: number;
  contract_address?: string;
  transaction_type: string;
  method_name: string;
  status: string;
  created_at: string;
}

export interface Dataset {
  id: number;
  name: string;
  slug: string;
  description?: string;
  version: string;
  chain: string;
  dataset_type: string;
  block_start: number;
  block_end: number;
  tx_count: number;
  wallets_count: number;
  created_at: string;
}

export interface AnalysisResponse {
  analysis_id: string;
  query: string;
  parsed_intent?: string;
  metric_id: string;
  metric: string;
  metric_version: string;
  dataset_name: string;
  dataset_version: string;
  generated_sql: string;
  generated_web3?: string;
  result: number;
  unit: string;
  independent_result: number;
  difference: number;
  tolerance: number;
  validation_status: string;
  reproducibility_status: string;
  reproducibility_hash: string;
  execution_time_ms: number;
  timestamp: string;
  entities?: {
    time_range?: string;
    time_days?: number;
    entity_chain?: string;
    sender_filter?: string;
    receiver_filter?: string;
    min_value?: number;
    status_filter?: string;
  };
  report_id?: string;
}

export interface ReproductionResponse {
  analysis_id: string;
  report_id: string;
  original_result: number;
  reproduced_result: number;
  unit: string;
  difference: number;
  reproduction_status: string;
  reproduced_at: string;
  is_match: boolean;
  reproducibility_hash: string;
}

export interface QueryParseResponse {
  original_query: string;
  intent: string;
  canonical_metric_id: string;
  metric_name: string;
  confidence: number;
  entities: {
    time_range?: string;
    time_days?: number;
    entity_chain?: string;
    sender_filter?: string;
    receiver_filter?: string;
    min_value?: number;
    status_filter?: string;
  };
  explanation_steps: string[];
  is_supported: boolean;
  suggestions: string[];
}

export interface QueryGenerateResponse {
  metric_id: string;
  metric_name: string;
  formal_definition: string;
  standard_sql: string;
  web3_python: string;
  required_columns: string[];
  ast_summary: Record<string, any>;
}

export interface ReportSummary {
  report_id: string;
  analysis_id: string;
  title: string;
  author: string;
  query: string;
  metric: string;
  result: number;
  unit: string;
  validation_status: string;
  reproducibility_status: string;
  created_at: string;
  reproduced_count: number;
  last_reproduced_at?: string;
}

export interface DashboardStats {
  total_transactions: number;
  unique_wallets: number;
  total_volume_eth: number;
  total_blocks: number;
  total_smart_contracts: number;
  queries_processed: number;
  metrics_defined: number;
  validated_queries: number;
  reproducible_analyses: number;
  gas_usage_avg_gwei: number;
  daily_transactions: { date: string; transactions: number; count: number }[];
  daily_volume: { date: string; volume: number }[];
  active_wallets_series: { date: string; wallets: number }[];
  block_growth: { block: string; height: number }[];
  recent_transactions: Transaction[];
}

export interface BlockchainStatus {
  is_connected: boolean;
  status: string;
  rpc_url: string;
  latest_block?: number;
  chain_id?: number;
  gas_price_gwei?: number;
  client_version?: string;
  message?: string;
}
