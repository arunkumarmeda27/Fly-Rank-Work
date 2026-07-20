# Portfolio Case Studies

## 🎙️ Voice Card

- **Style**: Conversational, punchy, direct, grounded, technical (5 words)
- **Rule**: Avoid corporate fluff and generic AI buzzwords. Speak honestly, show technical details, and keep copy tight.

---

## 📁 Project Case Studies

### 1. Fly-Rank-Work (Environment & AI Toolchain)

- **The Problem**
  Setting up local development workflows is usually a mess of undocumented configurations and inconsistent AI tooling. If you don't define the rules early, AI assistants write heavy boilerplate, use libraries you don't need, and clutter the Git history with messy, unstructured commits.

- **What I Did & Decided**
  I initialized a clean Node.js and Git workspace. Instead of relying on manual instructions, I wrote `CLAUDE.md` to act as a strict instruction manual for my AI assistant (Antigravity). I decided on a vanilla stack—HTML5, ES6+ JavaScript, and Vanilla CSS—and locked down the Conventional Commits 1.0.0 format from commit #1.

- **The Outcome**
  A zero-boilerplate, deterministic development environment. The AI assistant follows naming conventions, layout guidelines, and commit formats automatically without needing constant prompts. The repository history is clean, starting with three structured, conventional commits.

---

### 2. Code Rakshak (AI Code Vulnerability Scanner)

- **The Problem**
  Developers often push insecure or poorly formatted code because running static analysis tools is tedious and the output is hard to read. There was no simple way to get an immediate, readable audit of both security vulnerabilities and formatting quality in one place.

- **What I Did & Decided**
  I built an AI-powered code analysis platform using JavaScript and Node.js. It scans uploaded code files and scores them on two metrics: Strength (security flaws) and Fairness (formatting quality). Instead of just showing logs in a terminal, I decided to compile the results into a downloadable PDF report directly on the server so developers have a shareable audit trail.

- **The Outcome**
  A single-button scanner that takes raw source code and returns a clear security report in seconds. Developers get a downloadable PDF checklist detailing exact line numbers and vulnerabilities to fix before deploying.

---

### 3. DSCE Mini Project (University ERP Management System)

- **The Problem**
  Managing university student projects was a spreadsheet nightmare. Students struggled to form teams, guides were accidentally overallocated, and tracking milestone submissions required endless back-and-forth emails.

- **What I Did & Decided**
  I built a full-stack project portal using React for the frontend, FastAPI for the backend, and Firebase for authentication and database storage. I decided to enforce team size limits and guide allocation quotas at the database level to prevent guide overloading, and integrated automated email notifications to trigger on admin approvals.

- **The Outcome**
  Replaced a manual, spreadsheet-based university workflow with a secure ERP system. The platform handles real-time team registrations and guide allocations, reducing admin review time from weeks to hours.

---

## 👤 Bio & Contact

I'm Arun Kumar Meda. I build full-stack web applications and AI-driven developer tools that solve specific workflow bottlenecks. No fluff, just clean code that works.

- **GitHub**: [github.com/arunkumarmeda27](https://github.com/arunkumarmeda27)
- **LinkedIn**: [linkedin.com/in/arunkumarmeda27](https://linkedin.com/in/arunkumarmeda27)

---

## 🔄 Copy Critique: Before vs. After

- **Before (Generic AI / Corporate)**

  > "I designed a highly scalable and innovative AI-enabled solution, leveraging cutting-edge algorithms to maximize code security and optimize developer velocity in an agile environment."

- **After (Conversational, Punchy, Technical)**
  > "I built an AI tool that scans code files, flags security bugs, and writes a PDF report. It takes 5 seconds."
