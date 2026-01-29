# NodeFlow - Complete Build Instructions

## Phase 1: Repository Setup (COMPLETED ✅)

✅ GitHub repository created: https://github.com/Havoc7911/nodeflow
✅ Initial files created:
- package.json (with all dependencies)
- tsconfig.json (strict TypeScript configuration)
- .gitignore (Node.js template)
- README.md (project description)
- QUICK_START.md (quick reference guide)

## Phase 2: Local Development Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Havoc7911/nodeflow.git
cd nodeflow
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React 18.2.0
- React Flow (for the node-based canvas)
- Zustand (for state management)
- TypeScript 5.1.6
- SQLite (better-sqlite3) for persistence
- Vite (build tool)
- Vitest (testing framework)
- ESLint (code linting)

### Step 3: Create Project Directory Structure

Create the following folders:

```bash
mkdir -p src/{types,engine,db,nodes,components,store,utils}
mkdir -p public
mkdir -p docs
```

### Step 4: Create Additional Configuration Files

#### Create `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@types': path.resolve(__dirname, './src/types'),
      '@engine': path.resolve(__dirname, './src/engine'),
      '@db': path.resolve(__dirname, './src/db'),
      '@nodes': path.resolve(__dirname, './src/nodes'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    target: 'ES2020',
    outDir: 'dist',
    minify: 'terser',
  },
})
```

#### Create `.env.example`

```bash
# Database
DATABASE_PATH=./nodeflow.db
DATABASE_BACKUP=./backup.db

# Logging
LOG_LEVEL=info
DEBUG=false

# API Keys (add as needed)
OPENAI_API_KEY=
SLACK_WEBHOOK_URL=
GMAIL_PASSWORD=
```

#### Create `.env` (for development)

Copy `.env.example` to `.env` and fill in values as needed.

### Step 5: Create Initial Type Definitions

Create `src/types/core.ts`:

```typescript
// Core Node and Graph types
export interface Node {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, any>
  config?: ConfigField[]
}

export interface Edge {
  id: string
  source: string
  sourceHandle: string | null
  target: string
  targetHandle: string | null
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
}

export interface ConfigField {
  name: string
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea'
  label: string
  defaultValue?: any
  options?: Array<{ label: string; value: any }>
  required?: boolean
  validation?: (value: any) => boolean
}
```

Create `src/types/port.ts`:

```typescript
// Port/connection types
export type PortDataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'any'

export interface Port {
  name: string
  type: PortDataType
  required?: boolean
  description?: string
}

export interface InputPorts {
  [key: string]: Port
}

export interface OutputPorts {
  [key: string]: Port
}
```

Create `src/types/errors.ts`:

```typescript
// Custom error classes
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class GraphError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GraphError'
  }
}

export class ExecutionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ExecutionError'
  }
}
```

### Step 6: Create Base Node Class

Create `src/nodes/BaseNode.ts`:

```typescript
import { InputPorts, OutputPorts, Port } from '@types/port'
import { ConfigField } from '@types/core'

export abstract class BaseNode {
  id: string
  type: string
  name: string
  description?: string
  inputPorts: InputPorts = {}
  outputPorts: OutputPorts = {}
  configSchema: ConfigField[] = []
  config: Record<string, any> = {}

  constructor(
    id: string,
    type: string,
    name: string,
    config: Record<string, any> = {}
  ) {
    this.id = id
    this.type = type
    this.name = name
    this.config = config
  }

  abstract async execute(inputs: Record<string, any>): Promise<Record<string, any>>

  validate(): boolean {
    return true
  }

  getSchema() {
    return {
      type: this.type,
      name: this.name,
      inputPorts: this.inputPorts,
      outputPorts: this.outputPorts,
      configSchema: this.configSchema,
    }
  }
}
```

### Step 7: Create Zustand Stores

Create `src/store/GraphStore.ts`:

```typescript
import { create } from 'zustand'
import { Graph, Node, Edge } from '@types/core'

interface GraphState {
  graphs: Graph[]
  currentGraph: Graph | null
  createGraph: (name: string) => void
  loadGraph: (id: string) => void
  saveGraph: (graph: Graph) => void
  addNode: (node: Node) => void
  removeNode: (id: string) => void
  addEdge: (edge: Edge) => void
  removeEdge: (id: string) => void
}

export const useGraphStore = create<GraphState>((set) => ({
  graphs: [],
  currentGraph: null,
  createGraph: (name) =>
    set((state) => {
      const newGraph: Graph = {
        id: Date.now().toString(),
        name,
        nodes: [],
        edges: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      return {
        graphs: [...state.graphs, newGraph],
        currentGraph: newGraph,
      }
    }),
  loadGraph: (id) =>
    set((state) => ({
      currentGraph: state.graphs.find((g) => g.id === id) || null,
    })),
  saveGraph: (graph) =>
    set((state) => ({
      graphs: state.graphs.map((g) => (g.id === graph.id ? graph : g)),
      currentGraph: graph,
    })),
  addNode: (node) =>
    set((state) => {
      if (!state.currentGraph) return state
      return {
        currentGraph: {
          ...state.currentGraph,
          nodes: [...state.currentGraph.nodes, node],
          updatedAt: new Date(),
        },
      }
    }),
  removeNode: (id) =>
    set((state) => {
      if (!state.currentGraph) return state
      return {
        currentGraph: {
          ...state.currentGraph,
          nodes: state.currentGraph.nodes.filter((n) => n.id !== id),
          updatedAt: new Date(),
        },
      }
    }),
  addEdge: (edge) =>
    set((state) => {
      if (!state.currentGraph) return state
      return {
        currentGraph: {
          ...state.currentGraph,
          edges: [...state.currentGraph.edges, edge],
          updatedAt: new Date(),
        },
      }
    }),
  removeEdge: (id) =>
    set((state) => {
      if (!state.currentGraph) return state
      return {
        currentGraph: {
          ...state.currentGraph,
          edges: state.currentGraph.edges.filter((e) => e.id !== id),
          updatedAt: new Date(),
        },
      }
    }),
}))
```

### Step 8: Create Main App Component

Create `src/App.tsx`:

```typescript
import React from 'react'
import { useGraphStore } from '@store/GraphStore'

function App() {
  const { currentGraph, createGraph } = useGraphStore()

  return (
    <div className="app">
      <header>
        <h1>NodeFlow</h1>
        <p>Node-based productivity and workspace suite</p>
      </header>
      <main>
        {!currentGraph ? (
          <div>
            <button onClick={() => createGraph('Untitled Graph')}>
              Create New Graph
            </button>
          </div>
        ) : (
          <div>
            <h2>{currentGraph.name}</h2>
            <p>Graph with {currentGraph.nodes.length} nodes</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
```

Create `src/index.tsx`:

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

Create `index.html` in root:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NodeFlow</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```

### Step 9: Start Development Server

```bash
npm run dev
```

Your app will be available at `http://localhost:5173`

## Phase 3: Next Development Steps

1. **Build Canvas Component** - Implement React Flow visual editor
2. **Implement Execution Engine** - Graph validation, topological sort, execution
3. **Set Up Database** - SQLite schema and queries
4. **Create Node Implementations** - DocumentSource, Email, Transform nodes
5. **Build Inspector Panel** - Property editor for nodes
6. **Add Authentication** - Optional: user login
7. **Create Tests** - Unit tests for engine and nodes

## Troubleshooting

### Dependencies installation fails
```bash
rm package-lock.json
npm cache clean --force
npm install
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### TypeScript errors
```bash
npm run type-check
```

### Clear node_modules and reinstall
```bash
rm -rf node_modules
npm install
```

## Resources

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- Zustand: https://github.com/pmndrs/zustand
- React Flow: https://reactflow.dev
- Tailwind CSS: https://tailwindcss.com
