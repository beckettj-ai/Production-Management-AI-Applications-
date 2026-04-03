// src/types.ts

export type CopyrightStatus = 'Public Domain' | 'Creative Commons' | 'Orphan Work' | 'Copyrighted' | 'Cleared';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type WorkflowStage = 'Backlog' | 'Searching' | 'Pending Response' | 'Cleared' | 'Rejected';
export type AssetType = 'Video' | 'Image' | 'Audio';

export interface User {
  id: string;
  name: string;
  email: string;
  production_company: string;
}

export interface Project {
  id: string;
  title: string;
  synopsis: string;
  intended_distribution: string;
}

export interface Asset {
  id: string;
  asset_name: string;
  asset_type: AssetType;
  thumbnail_url: string;
  detected_source: string;
  source_url?: string;
  copyright_status: CopyrightStatus;
  risk_level: RiskLevel;
  workflow_stage: WorkflowStage;
  ai_confidence_score: number;
  last_updated: string;
  rights_holder?: RightsHolder;
}

export interface RightsHolder {
  id: string;
  name: string;
  contact_email: string;
  organization: string;
}

export interface OutreachDraft {
  subject: string;
  body: string;
}
