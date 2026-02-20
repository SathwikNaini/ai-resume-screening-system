
export interface SkillWeight {
  skill: string;
  impact: 'High' | 'Medium' | 'Low';
  type: 'Critical' | 'Supporting';
}

export interface RoadmapItem {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  improvement_potential: string;
}

export interface AlternativeRole {
  role: string;
  fit: 'Best' | 'Partial' | 'Not suitable';
  reason: string;
}

export interface AnalysisResult {
  // v5.0 Advanced Features
  suitability_score: number;
  semantic_match_score: number;
  ai_confidence_score: number;
  job_complexity: 'Low' | 'Medium' | 'High';
  readiness_timeline: {
    current: number;
    potential: number;
  };
  overqualification_status: 'Underqualified' | 'Well-matched' | 'Overqualified';
  skill_redundancy: string[];
  hiring_risk: 'Low' | 'Medium' | 'High';
  score_formula_explanation: string;
  alternative_role_fit: AlternativeRole[];
  primary_rejection_reason: string;
  bias_check: string;
  verdict: 'Strong Fit' | 'Moderate Fit' | 'Not Suitable';

  // Supporting Features
  recommended_role_levels: ('Intern' | 'Junior' | 'Mid-level' | 'Senior')[];
  skill_importance_weights: SkillWeight[];
  matched_skills: { skill: string; status: string }[];
  missing_skills: { skill: string; status: string }[];
  skill_gap_roadmap: RoadmapItem[];
  rank_explanation: string;
  risk_flags: string[];
  bias_note: string;
  summary: string;
  experience_alignment: string;
  key_highlights: string[];
  recommendation: string;
  primary_reduction_reason: string;
  
  // Legacy UI fields
  education_summary: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  rawText: string;
  fileName: string;
  analysis?: AnalysisResult;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export enum AppTab {
  DASHBOARD = 'DASHBOARD',
  UPLOADER = 'UPLOADER',
  DOCUMENTATION = 'DOCUMENTATION'
}

export interface SessionState {
  jobTitle: string;
  jobDescription: string;
  resumes: Candidate[];
  results: Candidate[];
  metrics: {
    totalApplicants: number;
    processed: number;
    topScore: number;
    averageScore: number;
  };
}
