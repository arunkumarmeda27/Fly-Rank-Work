# AI-Assisted Workflow Drill: Vague vs. Precise Prompting

This document compares the development outcomes of building a settings form with validation under two distinct prompting strategies: **Round 1 (Vague & Lazy)** vs. **Round 2 (Precise & Verified)**.

---

## 📊 Summary Statistics
| Metric | Round 1 (Vague) | Round 2 (Precise) | Difference |
| :--- | :--- | :--- | :--- |
| **Files Created** | 1 (`index.html`) | 6 (`index.html`, `style.css`, `app.js`, `validation.js`, `test-validation.js`, `package.json`) | +5 files |
| **Lines of Code** | 110 lines | 554 lines | +444 lines |
| **Validation Coverage** | None | 12 Unit Assertions | 100% passes |
| **Review & Fix Time** | High (Vulnerable/Bloated) | Zero (Production-Ready) | Significant savings |

---

## 🔍 Comparative Analysis

### 1. Correctness & Code Structure
* **Round 1 (Vague)**: All styling, markup, and validation logic were dumped into a single `index.html` file. The validation is highly fragile and prone to false positives: email validation checks if `@` exists (`indexOf('@') === -1`), allowing invalid formats like `name@` or `@domain` to pass. There is no separation of concerns.
* **Round 2 (Precise)**: Code is modularized into distinct layers following standard web design practices: HTML structure, Vanilla CSS styling, validation rules as pure functions (`validation.js`), and DOM event hook-ups (`app.js`). Validation rules use robust regular expressions, checking name patterns (letters/spaces only) and enforcing secure password rules (numbers and special characters).

### 2. Accessibility (a11y)
* **Round 1 (Vague)**: Completely lacks accessibility. Forms lack `<main>` semantic grouping. Label elements are wrapper tags without explicit `for`/`id` mappings, which degrades screen reader navigation. Error messages are appended to a generic div without any ARIA notifications or focus management.
* **Round 2 (Precise)**: Fully accessible out of the box. Form fields use explicit `for`/`id` labels and include `aria-required="true"`. Descriptions and inline errors are mapped to inputs via `aria-describedby`. Errors are announced using `aria-live="assertive"`. Critically, upon form submission failure, focus is programmatically shifted to the first invalid field (`firstInvalidInput.focus()`), enabling a seamless experience for keyboard-only and screen reader users.

### 3. Edge Cases & Validation UX
* **Round 1 (Vague)**: Validation only triggers on form submit. If multiple inputs are invalid, only the first encountered error is shown globally, forcing users to submit multiple times to find all errors.
* **Round 2 (Precise)**: Validation triggers in real-time on input `blur` (blur event), and clears dynamically as the user starts typing (`input` event) to eliminate frustration. 

### 4. Review and Development Velocity
* **The Lesson**: Although Round 1 was generated instantly, review and refactoring would take 15–20 minutes of manual code rewriting to make it secure, testable, and accessible. Round 2 took slightly longer to prompt and plan, but the resulting codebase was 100% correct, verified by automated unit tests (`npm run test`), and immediately production-ready.
