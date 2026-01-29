# NodeFlow - Quick Start Guide

## Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm or yarn
- Git

## Step 1: Clone the Repository

```bash
git clone https://github.com/Havoc7911/nodeflow.git
cd nodeflow
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Set Up Project Structure

The following folder structure will be created by running the setup script:

```
nodeflow/
├── src/
│   ├── types/              # TypeScript type definitions
│   │   ├── core.ts
│   │   ├── port.ts
│   │   └── errors.ts
│   ├── engine/             # Graph execution engine
│   │   ├── GraphEngine.ts
│   │   ├── GraphValidator.ts
│   │   ├── TopologicalSort.ts
│   │   ├── RetryHandler.ts
│   │   └── ExecutionManager.ts
│   ├── db/                 # Database layer
│   │   ├── Database.ts
│   │   ├── queries/
│   │   └── migrations/
│   ├── nodes/              # Node implementations
│   │   ├── BaseNode.ts
│   │   ├── source/
│   │   ├── transform/
│   │   ├── sink/
│   │   └── process/
│   ├── components/         # React components
│   │   ├── Canvas.tsx
│   │   ├── Inspector.tsx
│   │   ├── CustomNode.tsx
│   │   ├── Sidebar.tsx
│   │   └── ExecutionLogs.tsx
│   ├── store/              # Zustand stores
│   │   ├── GraphStore.ts
│   │   ├── ExecutionStore.ts
│   │   └── UIStore.ts
│   ├── utils/              # Utilities
│   │   ├── logger.ts
│   │   ├── crypto.ts
│   │   └── validators.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
├── dist/                   # Built output
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

## Step 4: Create Configuration Files

### Create `tsconfig.json`

```bash
npm run setup:tsconfig
```

Or manually create with strict TypeScript settings.

### Create `vite.config.ts`

Vite configuration for fast builds and React Fast Refresh.

### Create `.env.example`

Environment variables template for the project.

## Step 5: Initialize Database

```bash
npm run db:init
```

This creates the SQLite database and runs migrations.

## Step 6: Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Step 7: Build for Production

```bash
npm run build
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest unit tests |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run db:init` | Initialize SQLite database |

## Next Steps

1. **Create Core Types** - See `src/types/`
2. **Build Graph Engine** - See `src/engine/`
3. **Implement Nodes** - See `src/nodes/`
4. **Create React Components** - See `src/components/`
5. **Set Up Database** - See `src/db/`

## Troubleshooting

### Node modules not installing?
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
npm run type-check
```

### Database issues?
```bash
rm -rf nodeflow.db
npm run db:init
```

## Documentation

Refer to these detailed documentation files:
- `NodeFlow-spec.md` - Architecture overview
- `nodeflow-data-models.md` - Database schema
- `nodeflow-node-specs.md` - Node type specifications
- `NodeFlow-React-Canvas-Component.md` - UI implementation
- `NodeFlow-Execution-Engine.md` - Execution logic

## Contributing

See `CONTRIBUTING.md` for development guidelines.

## License

MIT License - see LICENSE file
