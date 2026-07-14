# AI Workflow Audit & Tool Setup

This document outlines the workflow audit, target tasks, and Claude Project custom instructions for my Fly Rank track, reflecting my real workload as a student at DSCE and full-stack developer.

---

## 🛠️ Tool Setup & Academy Enrollment
* **Claude Account**: Active
* **ChatGPT Account**: Active
* **Anthropic Academy Account**: Active
* **Enrolled Course**: *AI Fluency: Framework & Foundations* (Module 1 Completed)

---

## 📋 Weekly Workflow Audit

| Task | Classification | Rationale |
| :--- | :--- | :--- |
| **1. Reviewing security pull requests (Code Rakshak)** | Collaborate with AI | AI excels at spotting potential vulnerabilities, but I must make the final threat modeling decisions. |
| **2. Writing core SQL schemas & constraints** | Collaborate with AI | AI handles the boilerplate syntax, but I must structure relationships to fit the business logic. |
| **3. Assigning college project groups & guides (DSCE)** | **Just Me** | Requires human empathy, guide politics, and team dynamics that AI cannot understand. |
| **4. Writing boilerplate API routes (FastAPI / Node.js)** | Delegate with Review | Routing is repetitive; AI drafts the structure, and I review the parameter types. |
| **5. Debugging runtime errors and logs** | Collaborate with AI | I supply the context and logs; AI helps brainstorm potential causes and fixes. |
| **6. Drafting university reports & project documents** | Delegate with Review | AI maps out the document layout and structure; I verify the technical descriptions are accurate. |
| **7. Studying CS algorithms (DBMS, OS) for exams** | **Just Me** | Learning and mental retention must happen in my own brain to pass university tests. |
| **8. Designing and styling frontend UI layouts** | Collaborate with AI | AI generates styling options; I inspect and adjust them to build high-fidelity pages. |
| **9. Running test suites and verify builds** | Fully Automate | Executed locally via shell scripts (`npm run test`) to give instant binary pass/fail results. |
| **10. Formatting and linting code blocks** | Fully Automate | Handled instantly on file-save by local formatters (Prettier, ESLint). |
| **11. Drafting emails to professors / project guides** | Delegate with Review | AI drafts the formal phrasing; I read and edit the tone before sending. |
| **12. Solving competitive programming (LeetCode)** | **Just Me** | Using AI for practice defeats the purpose and leaves me unprepared for technical interviews. |

---

## 🎯 Target Tasks & Success Definitions

These three tasks will be carried forward to evaluate AI collaboration efficiency:

### 1. Writing Boilerplate API Endpoints
* **Done Well Means**:
  - The endpoint is created without syntax or runtime errors.
  - Returns appropriate HTTP status codes (e.g., `201` for creations, `400` for client errors).
  - Integrates input validation (Pydantic / Joi schemas).
  - Database queries run and resolve in under `100ms`.

### 2. Debugging Runtime Errors
* **Done Well Means**:
  - The exact root cause is identified and explained in under 3 minutes.
  - A regression unit test is written to reproduce the bug.
  - The final fix resolves the error without breaking existing tests.

### 3. Drafting University Project Reports
* **Done Well Means**:
  - The generated text contains zero generic AI fluff or corporate jargon.
  - The technical architecture descriptions map exactly to real-world code.
  - Final review and editing require less than 15 minutes of manual correction.

---

## 👤 Claude Project Custom Instructions

Copy and paste these instructions into the Custom Instructions panel of your Claude Project:

```text
# Profile & Context
I am Arun Kumar Meda, a full-stack developer and computer science student at Dayananda Sagar College of Engineering (DSCE). I build AI-assisted web applications and developer tools, including my security scanner "Code Rakshak" and university ERP management portals.

# Tone & Style
- Style: Conversational, punchy, direct, grounded, technical.
- Never use generic corporate fluff (e.g., "results-driven", "synergy", "cutting-edge").
- Keep explanations tight. Show code or logs instead of long prose.
- When drafting copy or code descriptions, stay objective and cite concrete metrics (e.g., "fastapi resolve time", "package size") rather than vague marketing speak.

# Project Goals
- Succeed in the Fly Rank capstone track by building high-fidelity vanilla web applications.
- Keep dependency footprints tiny and optimize for page performance.
- Maintain a clean Git history using Conventional Commits 1.0.0.
```
