# Alloy Workspace - UI/UX Design Guide

## Design Philosophy
Alloy Workspace follows a "Google Clean" design approach: light surfaces, restrained color, abundant whitespace, and a fast, obvious user interface. The three-panel layout (Library → Canvas → Inspector) mirrors professional creative tools like Blender.

## Core Layout

```
┌─────────────────────────────────────────────────┐
│ Top Bar: Logo, Tabs, Search, Primary Actions   │
├──────────────┬──────────────────┬──────────────┤
│              │                  │              │
│  Library     │     Canvas       │  Inspector   │
│  (left)      │   (center)       │   (right)    │
│              │                  │              │
├──────────────┼──────────────────┼──────────────┤
│              │                  │              │
│  (scrollable)│  Node Graph      │  Properties  │
│  Categories  │  Editing Area    │  Form Fields │
│  & Nodes     │                  │  (scrollable)│
│              │                  │              │
├──────────────┴──────────────────┴──────────────┤
│ Bottom: Run Log, Output, Status Messages       │
└─────────────────────────────────────────────────┘
```

## Panel Descriptions

### Left Panel: Library (220-320px)
- **Collapsible file tree** showing project structure
- **Node categories** (Collect, Edit, Route, Save, Send, Automate)
- **Search/filter** for quick node discovery
- Keyboard shortcut: `t` to open file finder

### Center Panel: Canvas (flexible)
- **Grid background** (subtle, light)
- **Node-based editor** with drag-and-drop support
- **Edges** connecting node ports
- **Snap-to-grid** and **orthogonal edge routing**
- **Selection rectangle** (Shift+drag)
- **Pan** (middle mouse / spacebar+drag)
- **Zoom** (Ctrl+scroll or trackpad pinch)

### Right Panel: Inspector (280-400px)
- **Node header** showing name, type, status
- **Form fields** for node configuration
- **Validation feedback** (inline errors)
- **Copy/paste** node properties
- Collapsible sections for complex nodes

### Bottom Panel: Run Log
- **Execution status** (running, completed, failed)
- **Timestamped logs** from node execution
- **Error details** with stack traces (expandable)
- **Clear log** button

## Component Specs

### Nodes
- **Min Width**: 220px  
- **Header Height**: 28px  
- **Radius**: 12px  
- **Padding**: 12px (X), 10px (Y)  
- **Shadow**: Subtle on idle, elevated on hover/drag  
- **Selection State**: Thicker border, elevated shadow  

### Ports (Connection Points)
- **Size**: 10px diameter  
- **Fill**: White (light), Dark surface (dark)  
- **Border**: Subtle gray  
- **Hover**: Light blue fill  
- **Connected**: Highlight on edge hover  

### Edges (Node Connections)
- **Default Width**: 2px  
- **Selected Width**: 2.5px  
- **Stroke**: Gray (idle), Primary blue (hover/selected)  
- **Routing**: Orthogonal (prefer clean paths)  

## Interaction Patterns

### Keyboard Shortcuts
- `g + c` → Go to Code tab
- `g + i` → Go to Issues
- `g + p` → Go to Pull Requests
- `t` → Open file finder
- `Ctrl+K` → Command palette
- `Ctrl+A` → Select all nodes
- `Delete` → Delete selected nodes
- `Ctrl+Z` → Undo
- `Ctrl+Shift+Z` → Redo
- `Ctrl+S` → Save
- `Ctrl+Enter` → Run workflow
- `]` → Next file/node
- `[` → Previous file/node

### Mouse Interactions
- **Click** → Select node / navigate
- **Double-click** → Edit node / open inspector
- **Drag** → Move node / pan canvas  
- **Right-click** → Context menu (duplicate, delete, etc.)
- **Middle-click + drag** → Pan canvas  
- **Ctrl+drag** → Create selection rectangle  
- **Scroll** → Zoom canvas  

## Responsive Behavior

### Desktop (1200px+)
- Full 3-panel layout with comfortable spacing
- Inspector and Library at natural widths

### Tablet (768px–1199px)
- Left panel collapses to icon-only sidebar
- Inspector panels can slide out/in
- Canvas takes more horizontal space

### Mobile (< 768px)
- Single-column layout
- Tabs for Library / Canvas / Inspector
- Touch-friendly node ports (larger hit area)

## Accessibility

- **Focus Ring**: 3px, primary blue  
- **Contrast**: WCAG AA minimum (4.5:1 for text)
- **Keyboard Navigation**: Full support for keyboard-only users
- **Screen Reader**: Semantic HTML, ARIA labels
- **Color**: Never rely solely on color; use icons + labels
- **Animation**: Respects `prefers-reduced-motion`

## Dark Mode

- Triggered by `[data-theme="dark"]` attribute on root
- Uses CSS variable overrides (see `ALLOY-THEME-TOKENS.css`)
- All contrast ratios maintained in dark mode
- Subtle elevation (shadows) adapted for dark surfaces
