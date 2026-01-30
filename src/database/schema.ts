/**
 * Database Schema Definitions for Alloy Workspace
 * Defines TypeScript interfaces for data persistence
 */

// Project/Workflow Schema
export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings: ProjectSettings;
}

export interface ProjectSettings {
  autoSave: boolean;
  executionMode: 'manual' | 'auto';
  theme?: string;
}

// Graph/Workflow Schema
export interface Workflow {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  nodes: SerializedNode[];
  edges: SerializedEdge[];
  viewport?: Viewport;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface SerializedNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
  width?: number;
  height?: number;
}

export interface SerializedEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  data?: Record<string, any>;
}

export interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

// Execution History Schema
export interface ExecutionHistory {
  id: string;
  workflowId: string;
  startedAt: Date;
  completedAt?: Date;
  status: 'running' | 'completed' | 'failed' | 'aborted';
  progress: {
    total: number;
    completed: number;
    failed: number;
  };
  error?: string;
  results?: Record<string, any>;
}

// User Preferences Schema
export interface UserPreferences {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  gridSnap: boolean;
  autoSave: boolean;
  recentProjects: string[];
  shortcuts: Record<string, string>;
}

// Node Template Schema
export interface NodeTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  description?: string;
  defaultData: Record<string, any>;
  icon?: string;
  color?: string;
  createdAt: Date;
  isCustom: boolean;
}

// Database Collections/Tables
export interface DatabaseSchema {
  projects: Project[];
  workflows: Workflow[];
  executionHistory: ExecutionHistory[];
  userPreferences: UserPreferences[];
  nodeTemplates: NodeTemplate[];
}
