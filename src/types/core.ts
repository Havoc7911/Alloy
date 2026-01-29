// Core Node and Graph types for NodeFlow

export interface ConfigField {
  name: string
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea' | 'email' | 'password'
  label: string
  defaultValue?: any
  options?: Array<{ label: string; value: any }>
  required?: boolean
  validation?: (value: any) => boolean
  description?: string
}

export interface Node {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, any>
  config?: ConfigField[]
  selected?: boolean
  isConnectable?: boolean
}

export interface Edge {
  id: string
  source: string
  sourceHandle: string | null
  target: string
  targetHandle: string | null
  animated?: boolean
}

export interface Graph {
  id: string
  name: string
  description?: string
  nodes: Node[]
  edges: Edge[]
  createdAt: Date
  updatedAt: Date
  author?: string
  tags?: string[]
  version?: string
}

export interface ExecutionState {
  id: string
  graphId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
  nodeStates: Map<string, NodeExecutionState>
  startTime?: Date
  endTime?: Date
  error?: string
  progress: number
  totalNodes: number
  completedNodes: number
}

export interface NodeExecutionState {
  nodeId: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
  inputs: Record<string, any>
  outputs: Record<string, any>
  error?: string
  startTime?: Date
  endTime?: Date
  duration?: number
  retryCount: number
}

export interface ExecutionResult {
  graphId: string
  executionId: string
  success: boolean
  results: Map<string, any>
  errors: Map<string, string>
  duration: number
  timestamp: Date
}

export type NodeType = 'source' | 'transform' | 'sink' | 'process' | 'storage' | 'automation'

export interface NodeSchema {
  type: string
  category: NodeType
  name: string
  description?: string
  icon?: string
  inputPorts: Record<string, any>
  outputPorts: Record<string, any>
  configSchema: ConfigField[]
}

export interface GraphValidationError {
  type: 'structure' | 'connection' | 'cycle' | 'isolated'
  message: string
  nodeIds?: string[]
  edgeIds?: string[]
}
