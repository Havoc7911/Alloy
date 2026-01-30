# 🚀 Local Deployment Guide - Alloy Workspace

Complete guide for setting up and running Alloy Workspace locally on your machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm** or **yarn** (comes with Node.js)
  - Verify: `npm --version`

- **Git**
  - Download: https://git-scm.com/
  - Verify: `git --version`

---

## 🛠️ Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Havoc7911/Alloy.git
cd Alloy
```

### 2. Install Dependencies

```bash
npm install
```

**or** with yarn:

```bash
yarn install
```

This will install all required packages including:
- React & React DOM
- React Flow (for node-based UI)
- MobX (state management)
- Vite (build tool)
- TypeScript
- All other dependencies from package.json

### 3. Environment Configuration (Optional)

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` if needed for custom configuration.

---

## 🏃 Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

**or** with yarn:

```bash
yarn dev
```

The application will start at:
- **URL**: http://localhost:5173
- **Hot reload**: Automatically updates when you save changes

### Production Preview

Build and preview production version:

```bash
npm run build
npm run preview
```

**or** with yarn:

```bash
yarn build
yarn preview
```

---

## 📁 Project Structure

```
Alloy/
├── src/
│   ├── components/       # React components
│   │   ├── Canvas/       # Node editor canvas
│   │   ├── Sidebar/      # Node library sidebar
│   │   └── Execution/    # Execution panel & controls
│   ├── store/            # MobX state stores
│   │   ├── GraphStore.ts
│   │   ├── ExecutionStore.ts
│   │   └── UIStore.ts
│   ├── engine/           # Graph execution engine
│   │   ├── GraphExecutor.ts
│   │   ├── GraphValidator.ts
│   │   └── TopologicalSort.ts
│   ├── nodes/            # Node system
│   │   ├── handlers/     # Node type handlers
│   │   └── BaseNode.ts
│   ├── database/         # Data persistence
│   │   ├── schema.ts
│   │   └── LocalStorage.ts
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   └── index.tsx         # Entry point
├── public/               # Static assets
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies & scripts
```

---

## 🎯 Available Scripts

### `npm run dev`
Starts development server with hot module replacement

### `npm run build`
Creates optimized production build in `dist/` folder

### `npm run preview`
Previews production build locally

### `npm run lint` (if configured)
Runs code linting

---

## 🔧 Development Workflow

### 1. Start Development Server
```bash
npm run dev
```

### 2. Open Browser
Navigate to: http://localhost:5173

### 3. Make Changes
- Edit files in `src/`
- Changes will hot-reload automatically
- Check browser console for errors

### 4. Test Features
- **Canvas**: Drag and drop nodes
- **Execution**: Run graphs with Execute button
- **Persistence**: Data saved to browser localStorage

---

## 🌐 Browser Support

- **Chrome** (recommended) - Latest version
- **Firefox** - Latest version
- **Safari** - Latest version
- **Edge** - Latest version

**Note**: Modern browsers with ES2020+ support required

---

## 💾 Data Storage

Alloy uses **browser localStorage** for data persistence:

- **Projects**: Saved automatically
- **Workflows**: Node graphs and edges
- **Execution History**: Past execution runs
- **User Preferences**: Settings and themes

**Location**: Browser DevTools → Application → Local Storage

### Clear All Data

To reset the application:

```javascript
// In browser console:
localStorage.clear();
location.reload();
```

---

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
# Vite will automatically try next available port
# Or specify custom port:
npm run dev -- --port 3000
```

### Build Errors

1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear Vite cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

### Module Not Found

Ensure all dependencies are installed:
```bash
npm install
```

---

## 🚀 Next Steps

After successful deployment:

1. **Explore the UI**
   - Canvas for creating node graphs
   - Sidebar with 40+ node types
   - Execution panel for running workflows

2. **Create Your First Workflow**
   - Drag nodes from sidebar
   - Connect nodes with edges
   - Configure node properties
   - Execute the graph

3. **Customize & Extend**
   - Add custom node types in `src/nodes/handlers/`
   - Modify UI components
   - Integrate with external APIs

---

## 📚 Additional Resources

- **Project Documentation**: See `/docs` folder
- **Quick Start**: See `QUICK_START.md`
- **Build Instructions**: See `BUILD_INSTRUCTIONS.md`
- **Development Status**: See `DEVELOPMENT_STATUS.md`

---

## 🆘 Support

For issues or questions:
- **GitHub Issues**: https://github.com/Havoc7911/Alloy/issues
- **Documentation**: Check `/docs` folder

---

**🎉 You're all set! Happy building with Alloy Workspace!**
