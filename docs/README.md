# Portfolio Documentation Hub

**Last Updated**: 2025-11-21
**Project**: Johnny Sheng's Portfolio Website
**Version**: 4.0 (Post-Optimization Edition)

Welcome to the comprehensive documentation for Johnny Sheng's portfolio website. This documentation is organized into guides, reference materials, and architecture documentation to help you quickly find the information you need.

---

## Quick Navigation

### "I need to..."

**Get started quickly**
→ [Quick Start Guide](guides/QUICK_START.md) - Install, run, and make your first change in 5 minutes

**Add a new project to the portfolio**
→ [Adding Projects Guide](guides/ADDING_PROJECTS.md) - Step-by-step guide to add project pages with assets and routing

**Deploy to GitHub Pages**
→ [Deployment Guide](guides/DEPLOYMENT.md) - Build process, deployment commands, and troubleshooting

**Modify styles or colors**
→ [Styling Guide](guides/STYLING.md) - Color scheme, typography, visual effects, and design system

**Work with animations**
→ [Animations Guide](guides/ANIMATIONS.md) - Framer Motion patterns, keyframe animations, and performance tips

**Fix a problem**
→ [Troubleshooting Guide](guides/TROUBLESHOOTING.md) - Common issues with assets, styling, performance, browser compatibility, and git

---

### "I want to understand..."

**How the application is structured**
→ [Architecture Overview](architecture/OVERVIEW.md) - High-level architecture, component hierarchy, and design patterns

**How data flows through the app**
→ [Data Flow](architecture/DATA_FLOW.md) - projectParty data, archive items, state management, and component communication

**How routing works**
→ [Routing](architecture/ROUTING.md) - Route structure, formatting patterns, lazy loading, and navigation

**How state is managed**
→ [State Management](architecture/STATE_MANAGEMENT.md) - Local state patterns, hooks usage, and data flow

---

### "I need to look up..."

**Where files are located**
→ [File Locations](reference/FILE_LOCATIONS.md) - Complete file directory with descriptions and quick search

**Component details and APIs**
→ [Components Reference](reference/COMPONENTS.md) - All 16 components with props, state, and dependencies

**Technologies and dependencies**
→ [Dependencies](reference/DEPENDENCIES.md) - Complete tech stack with versions and usage patterns

**Asset organization and optimization**
→ [Assets Reference](reference/ASSETS.md) - Asset structure, sizes, optimization tips, and best practices

**Coding conventions**
→ [Conventions](reference/CONVENTIONS.md) - Naming patterns, import order, code structure, and common patterns

**Known issues and technical debt**
→ [Known Issues](reference/KNOWN_ISSUES.md) - Current bugs, technical debt, and cleanup priorities

---

## Documentation Structure

```
docs/
├── README.md                    (You are here - Navigation hub)
│
├── guides/                      (Task-oriented how-to guides)
│   ├── QUICK_START.md          - Get up and running in 5 minutes
│   ├── ADDING_PROJECTS.md      - Add new project pages step-by-step
│   ├── DEPLOYMENT.md           - Build and deploy to production
│   ├── STYLING.md              - Work with design system and styles
│   ├── ANIMATIONS.md           - Animation patterns and best practices
│   └── TROUBLESHOOTING.md      - Common issues and solutions
│
├── reference/                   (Detailed lookup documentation)
│   ├── FILE_LOCATIONS.md       - File directory and organization
│   ├── COMPONENTS.md           - Component catalog with APIs
│   ├── DEPENDENCIES.md         - Technology stack and packages
│   ├── ASSETS.md               - Asset management and optimization
│   ├── CONVENTIONS.md          - Code standards and patterns
│   └── KNOWN_ISSUES.md         - Bugs and technical debt tracker
│
└── architecture/                (System design documentation)
    ├── OVERVIEW.md             - High-level architecture
    ├── DATA_FLOW.md            - Data structures and flow patterns
    ├── ROUTING.md              - Routing configuration and patterns
    └── STATE_MANAGEMENT.md     - State management approach
```

---

## Project Overview

This is a production-ready React portfolio website featuring:

- **Modern Tech Stack**: React 18.2, Vite 6.0, Framer Motion 11.15, Three.js 0.171
- **Performance Optimized**: Code splitting (15 chunks), lazy loading, 797KB main bundle (227KB gzip)
- **Creative Features**: Custom WebGL shaders, animated cursor, route-reactive line animations
- **Clean Architecture**: 16 active components, 4,676 lines of code, no dead code
- **Well-Documented**: Comprehensive guides, references, and architecture documentation

**Health Score**: 9.5/10

---

## Key Statistics

- **Components**: 16 active React components (all functional)
- **Routes**: 11 functional routes with lazy loading
- **Bundle Size**: 797KB (227KB gzip) - 20% reduction from optimization
- **Assets**: 443MB (optimized, WebP versions available)
- **Code Quality**: No dead code, comprehensive documentation, modern patterns

---

## Search Keywords for AI Assistants

**Common Questions**:
- "How do I add a project?" → [ADDING_PROJECTS.md](guides/ADDING_PROJECTS.md)
- "Where are components located?" → [FILE_LOCATIONS.md](reference/FILE_LOCATIONS.md)
- "How does routing work?" → [ROUTING.md](architecture/ROUTING.md)
- "What are the color values?" → [STYLING.md](guides/STYLING.md)
- "How to deploy?" → [DEPLOYMENT.md](guides/DEPLOYMENT.md)
- "Animation not working?" → [TROUBLESHOOTING.md](guides/TROUBLESHOOTING.md)
- "What dependencies are used?" → [DEPENDENCIES.md](reference/DEPENDENCIES.md)
- "How is state managed?" → [STATE_MANAGEMENT.md](architecture/STATE_MANAGEMENT.md)
- "Where are project images stored?" → [ASSETS.md](reference/ASSETS.md)
- "What are the naming conventions?" → [CONVENTIONS.md](reference/CONVENTIONS.md)

---

## Contributing

When adding to this documentation:

1. **Use consistent formatting**: H2 for main sections, H3 for subsections
2. **Add frontmatter**: Include title, description, and keywords at top
3. **Add "See also" links**: Cross-reference related documents
4. **Use code blocks**: Always specify language (```javascript, ```bash, ```css)
5. **Keep it searchable**: Use clear headings and keywords
6. **Update this README**: Add links to new documents in appropriate sections

---

## Quick Links

- **Main Project README**: [/README.md](../README.md)
- **Architecture Docs**: [/ARCHITECTURE.md](../ARCHITECTURE.md)
- **Main Codebase Guide**: [/CLAUDE.md](../CLAUDE.md)
- **Optimization History**: [/WAVE_VERIFICATION.md](../WAVE_VERIFICATION.md)

---

**Need help?** Start with the [Quick Start Guide](guides/QUICK_START.md) or search for keywords above.
