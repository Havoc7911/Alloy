// Zustand store for UI state management
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UIStoreState {
  // Panel visibility
  showSidebar: boolean
  showInspector: boolean
  showExecutionLogs: boolean
  showNodeLibrary: boolean

  // Canvas state
  zoomLevel: number
  panX: number
  panY: number
  gridSize: number
  showGrid: boolean
  showMinimap: boolean

  // Selection & focus
  focusedNodeId: string | null
  hoveredNodeId: string | null
  hoveredEdgeId: string | null

  // Modes
  editMode: 'select' | 'pan' | 'connect' | 'delete'
  darkMode: boolean
  showSettings: boolean

  // Search/filter
  searchQuery: string
  filterNodeType: string | null

  // Notifications
  notifications: Array<{
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    message: string
    duration?: number
  }>

  // Panel actions
  toggleSidebar: () => void
  toggleInspector: () => void
  toggleExecutionLogs: () => void
  toggleNodeLibrary: () => void
  toggleSettings: () => void

  // Canvas actions
  setZoomLevel: (level: number) => void
  zoomIn: () => void
  zoomOut: () => void
  resetZoom: () => void
  setPan: (x: number, y: number) => void
  toggleGrid: () => void
  toggleMinimap: () => void

  // Focus/hover
  setFocusedNode: (id: string | null) => void
  setHoveredNode: (id: string | null) => void
  setHoveredEdge: (id: string | null) => void

  // Mode
  setEditMode: (mode: 'select' | 'pan' | 'connect' | 'delete') => void
  toggleDarkMode: () => void

  // Search
  setSearchQuery: (query: string) => void
  setFilterNodeType: (type: string | null) => void

  // Notifications
  addNotification: (type: 'info' | 'success' | 'warning' | 'error', message: string, duration?: number) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const useUIStore = create<UIStoreState>(
  devtools(
    (set, get) => ({
      // Initial state
      showSidebar: true,
      showInspector: true,
      showExecutionLogs: false,
      showNodeLibrary: false,
      zoomLevel: 1,
      panX: 0,
      panY: 0,
      gridSize: 20,
      showGrid: true,
      showMinimap: true,
      focusedNodeId: null,
      hoveredNodeId: null,
      hoveredEdgeId: null,
      editMode: 'select' as const,
      darkMode: false,
      showSettings: false,
      searchQuery: '',
      filterNodeType: null,
      notifications: [],

      // Panel toggles
      toggleSidebar: () =>
        set(
          (state) => ({ showSidebar: !state.showSidebar }),
          false,
          { type: 'toggleSidebar' }
        ),

      toggleInspector: () =>
        set(
          (state) => ({ showInspector: !state.showInspector }),
          false,
          { type: 'toggleInspector' }
        ),

      toggleExecutionLogs: () =>
        set(
          (state) => ({ showExecutionLogs: !state.showExecutionLogs }),
          false,
          { type: 'toggleExecutionLogs' }
        ),

      toggleNodeLibrary: () =>
        set(
          (state) => ({ showNodeLibrary: !state.showNodeLibrary }),
          false,
          { type: 'toggleNodeLibrary' }
        ),

      toggleSettings: () =>
        set(
          (state) => ({ showSettings: !state.showSettings }),
          false,
          { type: 'toggleSettings' }
        ),

      // Canvas zoom
      setZoomLevel: (level) =>
        set(
          () => ({ zoomLevel: Math.max(0.1, Math.min(level, 3)) }),
          false,
          { type: 'setZoomLevel' }
        ),

      zoomIn: () =>
        set(
          (state) => ({
            zoomLevel: Math.min(state.zoomLevel + 0.1, 3),
          }),
          false,
          { type: 'zoomIn' }
        ),

      zoomOut: () =>
        set(
          (state) => ({
            zoomLevel: Math.max(state.zoomLevel - 0.1, 0.1),
          }),
          false,
          { type: 'zoomOut' }
        ),

      resetZoom: () =>
        set(
          () => ({ zoomLevel: 1, panX: 0, panY: 0 }),
          false,
          { type: 'resetZoom' }
        ),

      setPan: (x, y) =>
        set(
          () => ({ panX: x, panY: y }),
          false,
          { type: 'setPan' }
        ),

      toggleGrid: () =>
        set(
          (state) => ({ showGrid: !state.showGrid }),
          false,
          { type: 'toggleGrid' }
        ),

      toggleMinimap: () =>
        set(
          (state) => ({ showMinimap: !state.showMinimap }),
          false,
          { type: 'toggleMinimap' }
        ),

      // Focus/hover
      setFocusedNode: (id) =>
        set(
          () => ({ focusedNodeId: id }),
          false,
          { type: 'setFocusedNode' }
        ),

      setHoveredNode: (id) =>
        set(
          () => ({ hoveredNodeId: id }),
          false,
          { type: 'setHoveredNode' }
        ),

      setHoveredEdge: (id) =>
        set(
          () => ({ hoveredEdgeId: id }),
          false,
          { type: 'setHoveredEdge' }
        ),

      // Edit mode
      setEditMode: (mode) =>
        set(
          () => ({ editMode: mode }),
          false,
          { type: 'setEditMode' }
        ),

      toggleDarkMode: () =>
        set(
          (state) => ({ darkMode: !state.darkMode }),
          false,
          { type: 'toggleDarkMode' }
        ),

      // Search
      setSearchQuery: (query) =>
        set(
          () => ({ searchQuery: query }),
          false,
          { type: 'setSearchQuery' }
        ),

      setFilterNodeType: (type) =>
        set(
          () => ({ filterNodeType: type }),
          false,
          { type: 'setFilterNodeType' }
        ),

      // Notifications
      addNotification: (type, message, duration = 5000) =>
        set(
          (state) => {
            const id = `notif_${Date.now()}_${Math.random()}`
            const newNotifications = [
              ...state.notifications,
              { id, type, message, duration },
            ]
            if (duration) {
              setTimeout(() => get().removeNotification(id), duration)
            }
            return { notifications: newNotifications }
          },
          false,
          { type: 'addNotification' }
        ),

      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          { type: 'removeNotification' }
        ),

      clearNotifications: () =>
        set(
          () => ({ notifications: [] }),
          false,
          { type: 'clearNotifications' }
        ),
    }),
    { name: 'nodeflow-ui-store' }
  )
)

export default useUIStore
