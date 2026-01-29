// Zustand store for graph state management
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Graph, Node, Edge } from '../types/core'

interface GraphState {
  graphs: Graph[]
  currentGraphId: string | null
  selectedNodeIds: Set<string>
  selectedEdgeIds: Set<string>
  clipboard: { nodes: Node[]; edges: Edge[] } | null

  // Graph operations
  createGraph: (name: string, description?: string) => string
  loadGraph: (id: string) => void
  deleteGraph: (id: string) => void
  updateGraphMetadata: (id: string, name: string, description?: string) => void
  duplicateGraph: (id: string) => string

  // Get current graph
  getCurrentGraph: () => Graph | null

  // Node operations
  addNode: (node: Node) => void
  removeNode: (id: string) => void
  updateNode: (id: string, updates: Partial<Node>) => void
  moveNode: (id: string, position: { x: number; y: number }) => void
  selectNode: (id: string, multiSelect?: boolean) => void
  deselectNode: (id: string) => void
  selectAllNodes: () => void
  deselectAllNodes: () => void

  // Edge operations
  addEdge: (edge: Edge) => void
  removeEdge: (id: string) => void
  selectEdge: (id: string, multiSelect?: boolean) => void
  deselectEdge: (id: string) => void

  // Clipboard operations
  copySelected: () => void
  cutSelected: () => void
  paste: () => void

  // Undo/Redo (basic implementation)
  undo: () => void
  redo: () => void

  // Validation
  hasUnsavedChanges: () => boolean
  resetChanges: () => void
}

const useGraphStore = create<GraphState>(
  devtools(
    persist(
      (set, get) => ({
        graphs: [],
        currentGraphId: null,
        selectedNodeIds: new Set(),
        selectedEdgeIds: new Set(),
        clipboard: null,

        createGraph: (name, description) =>
          set(
            (state) => {
              const newGraph: Graph = {
                id: `graph_${Date.now()}_${Math.random()}`,
                name,
                description,
                nodes: [],
                edges: [],
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              return {
                graphs: [...state.graphs, newGraph],
                currentGraphId: newGraph.id,
                selectedNodeIds: new Set(),
              }
            },
            false,
            { type: 'createGraph' }
          ),

        loadGraph: (id) =>
          set(
            (state) => ({
              currentGraphId: id,
              selectedNodeIds: new Set(),
              selectedEdgeIds: new Set(),
            }),
            false,
            { type: 'loadGraph' }
          ),

        deleteGraph: (id) =>
          set(
            (state) => ({
              graphs: state.graphs.filter((g) => g.id !== id),
              currentGraphId: state.currentGraphId === id ? null : state.currentGraphId,
            }),
            false,
            { type: 'deleteGraph' }
          ),

        updateGraphMetadata: (id, name, description) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === id ? { ...g, name, description, updatedAt: new Date() } : g
              ),
            }),
            false,
            { type: 'updateGraphMetadata' }
          ),

        duplicateGraph: (id) =>
          set(
            (state) => {
              const original = state.graphs.find((g) => g.id === id)
              if (!original) return state
              const duplicate: Graph = {
                ...original,
                id: `graph_${Date.now()}_${Math.random()}`,
                name: `${original.name} (copy)`,
                createdAt: new Date(),
                updatedAt: new Date(),
              }
              return {
                graphs: [...state.graphs, duplicate],
                currentGraphId: duplicate.id,
              }
            },
            false,
            { type: 'duplicateGraph' }
          ),

        getCurrentGraph: () => {
          const state = get()
          return state.graphs.find((g) => g.id === state.currentGraphId) || null
        },

        addNode: (node) =>
          set(
            (state) => {
              const graph = state.graphs.find((g) => g.id === state.currentGraphId)
              if (!graph) return state
              return {
                graphs: state.graphs.map((g) =>
                  g.id === state.currentGraphId
                    ? {
                        ...g,
                        nodes: [...g.nodes, node],
                        updatedAt: new Date(),
                      }
                    : g
                ),
              }
            },
            false,
            { type: 'addNode' }
          ),

        removeNode: (id) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === state.currentGraphId
                  ? {
                      ...g,
                      nodes: g.nodes.filter((n) => n.id !== id),
                      edges: g.edges.filter((e) => e.source !== id && e.target !== id),
                      updatedAt: new Date(),
                    }
                  : g
              ),
              selectedNodeIds: new Set([...state.selectedNodeIds].filter((nId) => nId !== id)),
            }),
            false,
            { type: 'removeNode' }
          ),

        updateNode: (id, updates) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === state.currentGraphId
                  ? {
                      ...g,
                      nodes: g.nodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
                      updatedAt: new Date(),
                    }
                  : g
              ),
            }),
            false,
            { type: 'updateNode' }
          ),

        moveNode: (id, position) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === state.currentGraphId
                  ? {
                      ...g,
                      nodes: g.nodes.map((n) => (n.id === id ? { ...n, position } : n)),
                    }
                  : g
              ),
            }),
            false,
            { type: 'moveNode' }
          ),

        selectNode: (id, multiSelect = false) =>
          set(
            (state) => {
              const newSelected = multiSelect ? new Set(state.selectedNodeIds) : new Set()
              newSelected.add(id)
              return { selectedNodeIds: newSelected }
            },
            false,
            { type: 'selectNode' }
          ),

        deselectNode: (id) =>
          set(
            (state) => {
              const newSelected = new Set(state.selectedNodeIds)
              newSelected.delete(id)
              return { selectedNodeIds: newSelected }
            },
            false,
            { type: 'deselectNode' }
          ),

        selectAllNodes: () =>
          set(
            (state) => {
              const graph = state.graphs.find((g) => g.id === state.currentGraphId)
              if (!graph) return state
              return {
                selectedNodeIds: new Set(graph.nodes.map((n) => n.id)),
              }
            },
            false,
            { type: 'selectAllNodes' }
          ),

        deselectAllNodes: () =>
          set(
            () => ({
              selectedNodeIds: new Set(),
              selectedEdgeIds: new Set(),
            }),
            false,
            { type: 'deselectAllNodes' }
          ),

        addEdge: (edge) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === state.currentGraphId
                  ? {
                      ...g,
                      edges: [...g.edges, edge],
                      updatedAt: new Date(),
                    }
                  : g
              ),
            }),
            false,
            { type: 'addEdge' }
          ),

        removeEdge: (id) =>
          set(
            (state) => ({
              graphs: state.graphs.map((g) =>
                g.id === state.currentGraphId
                  ? {
                      ...g,
                      edges: g.edges.filter((e) => e.id !== id),
                      updatedAt: new Date(),
                    }
                  : g
              ),
            }),
            false,
            { type: 'removeEdge' }
          ),

        selectEdge: (id, multiSelect = false) =>
          set(
            (state) => {
              const newSelected = multiSelect ? new Set(state.selectedEdgeIds) : new Set()
              newSelected.add(id)
              return { selectedEdgeIds: newSelected }
            },
            false,
            { type: 'selectEdge' }
          ),

        deselectEdge: (id) =>
          set(
            (state) => {
              const newSelected = new Set(state.selectedEdgeIds)
              newSelected.delete(id)
              return { selectedEdgeIds: newSelected }
            },
            false,
            { type: 'deselectEdge' }
          ),

        copySelected: () =>
          set(
            (state) => {
              const graph = state.graphs.find((g) => g.id === state.currentGraphId)
              if (!graph) return state
              const selectedNodes = graph.nodes.filter((n) => state.selectedNodeIds.has(n.id))
              const selectedEdges = graph.edges.filter(
                (e) => selectedNodes.some((n) => n.id === e.source) && selectedNodes.some((n) => n.id === e.target)
              )
              return {
                clipboard: {
                  nodes: selectedNodes,
                  edges: selectedEdges,
                },
              }
            },
            false,
            { type: 'copySelected' }
          ),

        cutSelected: () => {
          get().copySelected()
          const state = get()
          state.selectedNodeIds.forEach((id) => get().removeNode(id))
        },

        paste: () =>
          set(
            (state) => {
              if (!state.clipboard) return state
              const idMap = new Map<string, string>()
              state.clipboard.nodes.forEach((n) => {
                const newId = `node_${Date.now()}_${Math.random()}`
                idMap.set(n.id, newId)
              })
              const newNodes = state.clipboard.nodes.map((n) => ({
                ...n,
                id: idMap.get(n.id)!,
                position: { x: n.position.x + 20, y: n.position.y + 20 },
              }))
              const newEdges = state.clipboard.edges.map((e) => ({
                ...e,
                id: `edge_${Date.now()}_${Math.random()}`,
                source: idMap.get(e.source)!,
                target: idMap.get(e.target)!,
              }))
              return {
                graphs: state.graphs.map((g) =>
                  g.id === state.currentGraphId
                    ? {
                        ...g,
                        nodes: [...g.nodes, ...newNodes],
                        edges: [...g.edges, ...newEdges],
                        updatedAt: new Date(),
                      }
                    : g
                ),
              }
            },
            false,
            { type: 'paste' }
          ),

        undo: () => {
          console.log('Undo not yet implemented')
        },
        redo: () => {
          console.log('Redo not yet implemented')
        },

        hasUnsavedChanges: () => {
          const state = get()
          const graph = state.graphs.find((g) => g.id === state.currentGraphId)
          if (!graph) return false
          return graph.updatedAt > graph.createdAt || graph.nodes.length > 0 || graph.edges.length > 0
        },

        resetChanges: () =>
          set(
            (state) => ({
              selectedNodeIds: new Set(),
              selectedEdgeIds: new Set(),
            }),
            false,
            { type: 'resetChanges' }
          ),
      }),
      {
        name: 'nodeflow-graph-store',
      }
    )
  )
)

export default useGraphStore
