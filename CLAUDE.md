# CLAUDE.md - Fly Rank Capstone Project Guidelines

This file outlines the build commands, styling guidelines, and conventions for the Fly Rank Capstone repository.

## Writing Voice (Voice Card)
- **Style**: Conversational, punchy, direct, grounded, technical
- Avoid corporate jargon, fluff, and generic buzzwords. Speak honestly, show technical details, and keep copy tight.


## Tech Stack & Architecture
- **Core**: HTML5, Vanilla JavaScript (ES6+).
- **Styling**: Vanilla CSS (no CSS frameworks unless explicitly configured/requested).
- **Server/Runtime**: Node.js (LTS version).

## Common Developer Commands
- **Install Dependencies**: `npm install`
- **Run Local Dev Server**: `npm run dev`
- **Build Production Bundle**: `npm run build`
- **Run Tests**: `npm run test`

## Code Style & Conventions
- **Naming**: Use camelCase for variables/functions, PascalCase for classes, and UPPER_SNAKE_CASE for constants.
- **Formatting**: Keep code clean, modular, and self-documenting. Use 2 spaces for indentation.
- **File Structure**:
  - Keep components and modules isolated and reusable.
  - Put styling in focused, descriptive CSS files (e.g., `index.css`, `theme.css`).
- **Semantic HTML**: Always use standard HTML5 semantic elements (e.g., `<header>`, `<main>`, `<footer>`, `<section>`) with descriptive and unique element IDs.

## Git Workflow
- All commits must follow the **Conventional Commits 1.0.0** specification:
  - `feat: ...` for new features
  - `fix: ...` for bug fixes
  - `docs: ...` for documentation changes
  - `style: ...` for layout/visual changes
  - `chore: ...` for build task/config updates
