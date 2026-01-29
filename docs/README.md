# Alloy Workspace - Documentation Index

Welcome to the Alloy Workspace documentation! This directory contains all the guides, specifications, and design resources needed to understand and implement the Alloy Workspace platform.

## Documentation Structure

### [ALLOY-BRANDING.md](./ALLOY-BRANDING.md)
**Product Identity & Positioning**

Learn about Alloy Workspace's brand pillars, core value proposition, target audience, and messaging framework.

- Product name and tagline
- Core value proposition
- Four brand pillars (Universal, Unified, Powerful, Simple)
- Messaging for different audiences
- Target market segments

### [ALLOY-NODE-CATEGORIES.md](./ALLOY-NODE-CATEGORIES.md)
**Node Architecture & Categorization**

Understand the six operational node categories that form the foundation of the Alloy Workspace node-based system.

- Category overview and mapping (User-facing vs. Internal names)
- Detailed breakdown of each category:
  - Collect (Source)
  - Edit (Transform)
  - Route (Process)
  - Save (Storage)
  - Send (Sink)
  - Automate (Automation)
- Icon metaphors and visual associations
- Node naming conventions
- Library ordering and color coding

### [ALLOY-UI-UX.md](./ALLOY-UI-UX.md)
**User Interface & User Experience Design**

Comprehensive guide to the Alloy Workspace UI/UX design system, layout, and interaction patterns.

- Design philosophy (Google Clean aesthetic)
- Core 3-panel layout (Library, Canvas, Inspector)
- Panel descriptions and specifications
- Component specs (Nodes, Ports, Edges)
- Keyboard shortcuts and mouse interactions
- Responsive design breakpoints
- Accessibility standards
- Dark mode implementation

### [ALLOY-THEME-TOKENS.css](./ALLOY-THEME-TOKENS.css)
**Design Tokens & Theme Variables**

CSS custom properties (variables) for both light and dark modes. Drop this into your stylesheet to ensure consistent colors, spacing, typography, and other visual properties across the entire application.

**Light Mode Variables:**
- Core colors (backgrounds, surfaces, text, primary)
- Typography (font family, sizes, weights)
- Spacing scale (4px–24px)
- Borders & radius
- Shadows
- Motion (timing, easing)
- Category colors (Collect, Edit, Route, Save, Send, Automate)
- Status states (idle, running, success, warning, error)
- Component-specific tokens (Node, Ports, Edges, Canvas)

**Dark Mode Variables:**
- Complete theme override using `[data-theme="dark"]` selector
- All contrast ratios maintained
- Elevated shadows adapted for dark surfaces

**Usage:**
```css
/* Import or embed ALLOY-THEME-TOKENS.css in your app */
/* Then use variables throughout your stylesheets */

.node {
  background: var(--color-surface);
  border: 1px solid var(--node-border);
  border-radius: var(--node-radius);
  box-shadow: var(--node-shadow);
  padding: var(--node-pad-y) var(--node-pad-x);
}

.node.selected {
  border-color: var(--node-border-selected);
  box-shadow: var(--node-shadow-active);
}

.edit-node {
  /* Edit nodes use Edit category color */
  border-top: 3px solid var(--cat-edit);
}
```

## Quick References

### Node Categories at a Glance

| Category | Purpose | Icon | Color |
|---|---|---|---|
| Collect | Bring data in | Inbox tray | Blue (#4285F4) |
| Edit | Transform & enrich | Pencil | Purple (#A142F4) |
| Route | Control flow | Branching arrows | Amber (#F9AB00) |
| Save | Persist state | Disk | Teal (#12B5CB) |
| Send | Deliver outputs | Paper plane | Green (#34A853) |
| Automate | Schedule/trigger | Clock + bolt | Red (#EA4335) |

### Design System Principles

1. **Simplicity**: Clean, minimal UI with intentional whitespace
2. **Consistency**: Unified tokens and patterns across all panels
3. **Accessibility**: WCAG AA contrast, keyboard navigation, screen reader support
4. **Flexibility**: Light and dark modes, responsive layouts
5. **Performance**: Efficient rendering of large node graphs

## Implementation Checklist

- [ ] Review branding documentation for product positioning
- [ ] Implement node categories in your node library
- [ ] Design UI/UX using the 3-panel layout
- [ ] Integrate theme tokens (CSS variables) into your stylesheet
- [ ] Test light and dark mode switching
- [ ] Validate keyboard shortcuts and accessibility
- [ ] Test responsive layout on mobile, tablet, and desktop

## For Developers

1. **Node Types**: Reference `ALLOY-NODE-CATEGORIES.md` to understand the six operational categories
2. **Styling**: Use CSS variables from `ALLOY-THEME-TOKENS.css` throughout your components
3. **Layout**: Follow the 3-panel architecture described in `ALLOY-UI-UX.md`
4. **Branding**: Use messaging from `ALLOY-BRANDING.md` in documentation, onboarding, and help text

## For Designers

1. **Visual System**: `ALLOY-THEME-TOKENS.css` defines all colors, spacing, and typography
2. **Components**: Use the node, port, and edge specs from `ALLOY-UI-UX.md` as a starting point
3. **Interactions**: Refer to keyboard shortcuts and mouse interactions for consistent UX
4. **Brand Voice**: `ALLOY-BRANDING.md` provides messaging frameworks for different audiences

## Questions or Suggestions?

These documents are living guides. If you have feedback or suggestions for improvements, please open an issue or submit a pull request.

---

**Last Updated**: January 2026  
**Platform**: Alloy Workspace  
**Status**: Production Documentation
