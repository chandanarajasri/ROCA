import axios from 'axios';
import type {
  DashboardStats,
  AnalysisResponse,
  ReproductionResponse,
  QueryParseResponse,
  QueryGenerateResponse,
  Metric,
  SemanticRule,
  Dataset,
  Transaction,
  ReportSummary,
  BlockchainStatus
} from '../types';

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health
  getHealth: () => client.get('/health').then(r => r.data),

  // Dashboard
  getDashboardStats: (): Promise<DashboardStats> =>
    client.get('/dashboard/stats').then(r => r.data),

  // Analysis Pipeline
  executeAnalysis: (query: string, dataset_id: number = 1): Promise<AnalysisResponse> =>
    client.post('/analysis', { query, dataset_id }).then(r => r.data),

  getAnalysis: (analysisId: string): Promise<AnalysisResponse> =>
    client.get(`/analysis/${analysisId}`).then(r => r.data),

  reproduceAnalysis: (analysisId: string): Promise<ReproductionResponse> =>
    client.post(`/analysis/${analysisId}/reproduce`).then(r => r.data),

  // Query Ops
  parseQuery: (query: string): Promise<QueryParseResponse> =>
    client.post('/query/parse', { query }).then(r => r.data),

  generateQuery: (payload: {
    metric_id: string;
    dataset_id?: number;
    time_days?: number;
    chain?: string;
    status_filter?: string;
  }): Promise<QueryGenerateResponse> =>
    client.post('/query/generate', payload).then(r => r.data),

  // Metrics
  getMetrics: (): Promise<Metric[]> =>
    client.get('/metrics').then(r => r.data),

  getMetric: (metricId: string): Promise<Metric> =>
    client.get(`/metrics/${metricId}`).then(r => r.data),

  createMetric: (metric: Partial<Metric>): Promise<Metric> =>
    client.post('/metrics', metric).then(r => r.data),

  // Semantic Rules
  getSemanticRules: (): Promise<SemanticRule[]> =>
    client.get('/semantic-rules').then(r => r.data),

  createSemanticRule: (rule: Partial<SemanticRule>): Promise<SemanticRule> =>
    client.post('/semantic-rules', rule).then(r => r.data),

  toggleSemanticRule: (ruleId: string): Promise<{ rule_id: string; is_active: boolean }> =>
    client.put(`/semantic-rules/${ruleId}/toggle`).then(r => r.data),

  // Datasets
  getDatasets: (): Promise<Dataset[]> =>
    client.get('/datasets').then(r => r.data),

  getDataset: (datasetId: number): Promise<Dataset> =>
    client.get(`/datasets/${datasetId}`).then(r => r.data),

  // Transactions
  getTransactions: (params?: {
    dataset_id?: number;
    search?: string;
    method?: string;
    sender?: string;
    receiver?: string;
    block?: number;
    min_value?: number;
    max_value?: number;
    limit?: number;
    offset?: number;
  }): Promise<Transaction[]> =>
    client.get('/transactions', { params }).then(r => r.data),

  // Validation
  getValidationSummary: () =>
    client.get('/validation/summary').then(r => r.data),

  getStateDivergence: () =>
    client.get('/validation/divergence').then(r => r.data),

  // Reports
  getReports: (): Promise<ReportSummary[]> =>
    client.get('/reports').then(r => r.data),

  getReportPdfUrl: (reportId: string) =>
    `${API_BASE_URL}/reports/${reportId}/pdf`,

  // Blockchain
  getBlockchainStatus: (): Promise<BlockchainStatus> =>
    client.get('/blockchain/status').then(r => r.data),

  getLatestBlock: () =>
    client.get('/blockchain/latest-block').then(r => r.data),
};
