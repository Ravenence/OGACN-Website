export type ProjectStatus = 'On Track' | 'Delayed' | 'At Risk' | 'Completed';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Project {
  id: string;
  name: string;
  district: string;
  sector: string;
  department: string;
  budget: number;
  spent: number;
  progress: number;
  deadline: string;
  contractor: string;
  status: ProjectStatus;
  riskScore: number;
  complaints: number;
  description: string;
}

export interface Contract {
  id: string;
  projectId: string;
  projectName: string;
  contractor: string;
  contractAmount: number;
  startDate: string;
  deadline: string;
  status: 'Active' | 'Completed' | 'Suspended';
  transparencyScore: number;
  flags: string[];
}

export interface District {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  riskScore: number;
  reportCount: number;
  topSector: string;
  suspiciousProjects: number;
  trend: 'up' | 'down' | 'stable';
}

export interface Report {
  id: string;
  district: string;
  sector: string;
  projectName: string;
  type: string;
  summary: string;
  date: string;
  status: 'Pending' | 'Investigating' | 'Resolved';
  anonymous: boolean;
}

export interface AiInsight {
  id: string;
  title: string;
  district: string;
  severity: 'High' | 'Medium' | 'Low';
  confidence: number;
  explanation: string;
  relatedProjectId?: string;
}

export interface SummaryStats {
  totalBudget: number;
  totalSpent: number;
  activeProjects: number;
  delayedProjects: number;
  highRiskDistricts: number;
  publicReports: number;
}
