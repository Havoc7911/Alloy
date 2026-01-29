// Zustand store for execution state management
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { ExecutionState, NodeExecutionState } from '../types/core'

interface ExecutionStoreState {
  currentExecution: ExecutionState | null
  executionHistory: ExecutionState[]
  isRunning: boolean
  isPaused: boolean
  executionLogs: Array<{ timestamp: Date; level: 'info' | 'warn' | 'error'; message: string; nodeId?: string }>

  // Execution control
  startExecution: (graphId: string) => void
  pauseExecution: () => void
  resumeExecution: () => void
  stopExecution: () => void
  completeExecution: () => void

  // Node updates
  updateNodeState: (nodeId: string, state: Partial<NodeExecutionState>) => void
  recordNodeError: (nodeId: string, error: string) => void
  recordNodeOutput: (nodeId: string, outputs: Record<string, any>) => void

  // Logging
  addLog: (level: 'info' | 'warn' | 'error', message: string, nodeId?: string) => void
  clearLogs: () => void

  // History
  addToHistory: (execution: ExecutionState) => void
  clearHistory: () => void
  getExecutionHistory: (graphId: string) => ExecutionState[]

  // Progress
  updateProgress: (completed: number, total: number) => void

  // Query
  getNodeState: (nodeId: string) => NodeExecutionState | undefined
  getExecutionStatus: () => 'idle' | 'running' | 'paused' | 'completed' | 'failed'
}

const useExecutionStore = create<ExecutionStoreState>(
  devtools(
    (set, get) => ({
      currentExecution: null,
      executionHistory: [],
      isRunning: false,
      isPaused: false,
      executionLogs: [],

      startExecution: (graphId) =>
        set(
          (state) => {
            const execution: ExecutionState = {
              id: `exec_${Date.now()}_${Math.random()}`,
              graphId,
              status: 'running',
              nodeStates: new Map(),
              startTime: new Date(),
              progress: 0,
              totalNodes: 0,
              completedNodes: 0,
            }
            return {
              currentExecution: execution,
              isRunning: true,
              isPaused: false,
              executionLogs: [],
            }
          },
          false,
          { type: 'startExecution' }
        ),

      pauseExecution: () =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            return {
              isRunning: false,
              isPaused: true,
              currentExecution: {
                ...state.currentExecution,
                status: 'paused',
              },
            }
          },
          false,
          { type: 'pauseExecution' }
        ),

      resumeExecution: () =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            return {
              isRunning: true,
              isPaused: false,
              currentExecution: {
                ...state.currentExecution,
                status: 'running',
              },
            }
          },
          false,
          { type: 'resumeExecution' }
        ),

      stopExecution: () =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            return {
              isRunning: false,
              isPaused: false,
              currentExecution: {
                ...state.currentExecution,
                status: 'failed',
                endTime: new Date(),
              },
            }
          },
          false,
          { type: 'stopExecution' }
        ),

      completeExecution: () =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            const completed = { ...state.currentExecution, status: 'completed' as const, endTime: new Date() }
            return {
              isRunning: false,
              isPaused: false,
              currentExecution: completed,
              executionHistory: [completed, ...state.executionHistory.slice(0, 99)],
            }
          },
          false,
          { type: 'completeExecution' }
        ),

      updateNodeState: (nodeId, stateUpdate) =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            const nodeStates = new Map(state.currentExecution.nodeStates)
            const existing = nodeStates.get(nodeId) || {
              nodeId,
              status: 'pending',
              inputs: {},
              outputs: {},
              retryCount: 0,
            }
            nodeStates.set(nodeId, { ...existing, ...stateUpdate })
            return {
              currentExecution: {
                ...state.currentExecution,
                nodeStates,
              },
            }
          },
          false,
          { type: 'updateNodeState' }
        ),

      recordNodeError: (nodeId, error) =>
        set(
          (state) => {
            get().updateNodeState(nodeId, { status: 'failed', error })
            get().addLog('error', error, nodeId)
            return state
          },
          false,
          { type: 'recordNodeError' }
        ),

      recordNodeOutput: (nodeId, outputs) =>
        set(
          (state) => {
            get().updateNodeState(nodeId, { status: 'completed', outputs })
            get().addLog('info', `Node completed with output`, nodeId)
            return state
          },
          false,
          { type: 'recordNodeOutput' }
        ),

      addLog: (level, message, nodeId) =>
        set(
          (state) => ({
            executionLogs: [
              ...state.executionLogs,
              {
                timestamp: new Date(),
                level,
                message,
                nodeId,
              },
            ].slice(-100),
          }),
          false,
          { type: 'addLog' }
        ),

      clearLogs: () =>
        set(
          () => ({
            executionLogs: [],
          }),
          false,
          { type: 'clearLogs' }
        ),

      addToHistory: (execution) =>
        set(
          (state) => ({
            executionHistory: [execution, ...state.executionHistory.slice(0, 99)],
          }),
          false,
          { type: 'addToHistory' }
        ),

      clearHistory: () =>
        set(
          () => ({
            executionHistory: [],
          }),
          false,
          { type: 'clearHistory' }
        ),

      getExecutionHistory: (graphId) => {
        const state = get()
        return state.executionHistory.filter((e) => e.graphId === graphId)
      },

      updateProgress: (completed, total) =>
        set(
          (state) => {
            if (!state.currentExecution) return state
            return {
              currentExecution: {
                ...state.currentExecution,
                completedNodes: completed,
                totalNodes: total,
                progress: total > 0 ? (completed / total) * 100 : 0,
              },
            }
          },
          false,
          { type: 'updateProgress' }
        ),

      getNodeState: (nodeId) => {
        const state = get()
        return state.currentExecution?.nodeStates.get(nodeId)
      },

      getExecutionStatus: () => {
        const state = get()
        if (!state.currentExecution) return 'idle'
        if (state.isPaused) return 'paused'
        if (state.isRunning) return 'running'
        return state.currentExecution.status as 'completed' | 'failed'
      },
    }),
    { name: 'nodeflow-execution-store' }
  )
)

export default useExecutionStore
