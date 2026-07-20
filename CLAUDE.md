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

## Project Rules (Learned from Workflow Drill FE-03)

These rules are concrete and testable. A rule that cannot fail a code review is not a rule.

### Rule 1: Validation logic lives in its own module — never inline in HTML.
- All form field validation must be written as **pure, exported functions** in a dedicated `validation.js` file.
- Functions must accept a single value and return `{ isValid: boolean, message: string }`.
- This makes rules testable with `node test-validation.js` without loading a browser.
- **Violation**: Writing `if (email.indexOf('@') === -1)` inside a `<script>` tag inside an HTML file. This will be rejected in review.

### Rule 2: Every form input must have an explicit `for`/`id` label pair and an `aria-describedby` pointing to its inline error span.
- Labels must use `<label for="fieldId">`, never implicit wrapper labels.
- Every input must have a corresponding `<span id="fieldId-error" aria-live="assertive"></span>` for inline errors.
- On invalid form submission, `focus()` must be called on the first invalid input programmatically.
- **Violation**: Using a generic `<div id="message">` to report all errors at the top of the form with no ARIA live region. This is an accessibility failure and will be rejected.

### Rule 3: CSS design tokens must use CSS custom properties — no hardcoded hex values outside `:root`.
- All colours, spacing, and typography values must be declared as CSS variables in the `:root {}` block (e.g. `--accent: #3b82f6`).
- Component styles reference only variables (e.g. `color: var(--accent)`), never raw hex codes.
- **Violation**: Writing `background-color: blue` or `color: red` directly in component rules. Any hardcoded colour outside `:root` will be flagged in review.
