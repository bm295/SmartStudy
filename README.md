# SmartStudy AI

SmartStudy AI is a learning platform blueprint for students, focused on:
- automatic study planning
- progress tracking
- smart review with flashcards/quizzes
- focus support with Pomodoro and gamification

## Core Value

- Helps learners avoid last-minute cramming.
- Shows weak subjects clearly through dashboard analytics.
- Manages multiple subjects in one consistent workflow.
- Builds daily motivation with XP, levels, badges, and leaderboards.

## Main Features

1. Smart Dashboard
- Subject progress charts.
- Weekly and monthly task completion rates.
- Upcoming deadline alerts.

2. AI Study Planner
- Enter course or exam deadlines.
- Automatically splits tasks by remaining time.
- Rebalances the plan if users miss sessions.

3. Flashcard and Quiz Generator
- Upload study materials (PDF).
- Generate flashcards and multiple-choice questions.
- Track accuracy by topic.

4. Pomodoro Focus Mode
- Focus/break timer.
- Daily focused session tracking.
- Weekly study time summary.

5. Gamification
- XP, levels, and badges.
- Class or study-group leaderboard.

## Proposed Architecture

### Frontend (Angular 19)
- Standalone components.
- Angular Signals for local/reactive UI state.
- Lazy-loaded routes by feature.
- Angular Material or Tailwind CSS.
- Guards and interceptors for security and API flow.
- Optional SSR for SEO.

### Backend (suggested)
- NestJS (Node.js).
- MongoDB or PostgreSQL.
- Firebase Authentication.
- OpenAI API for intelligent quiz/flashcard generation.
- WebSocket for real-time progress sync.

## Current Repository Structure

- `smartstudy-ai/`
- Active Angular CLI workspace (single maintained app codebase).
- App shell, routes, feature components, and services.

- `docs/architecture.md`
- Business flow, data schema, and implementation roadmap.

- `Archived/`
- Legacy source code kept for reference.

## Run the App (Single Source of Truth)

Use only one codebase for maintenance: `smartstudy-ai/`.

### Prerequisites

Install Node.js and npm, then open a new terminal and check that both commands work:

```powershell
node --version
npm --version
```

A global Angular CLI installation is not required; this workspace already includes it as a development dependency.

### First-time setup

From the repository root:

```powershell
cd smartstudy-ai
npm ci
npm start
```

Open `http://localhost:4200/` after the server starts.

### Next runs

From the repository root:

```powershell
cd smartstudy-ai
npm start
```

To run tests with coverage, use `npm test -- --watch=false --coverage` from `smartstudy-ai/`.

### If PowerShell cannot find npm

If `npm` is not recognized, Node.js/npm is missing from `PATH` or is not installed. Install Node.js, reopen PowerShell, and run the version checks above again. On this development machine, Node and npm were found in these locations; if they exist on your machine too, this command enables them for the current PowerShell session:

```powershell
$env:Path = 'C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs;' + "$env:APPDATA\npm;" + $env:Path
npm --version
```

For a lasting fix on this machine, add `C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Microsoft\VisualStudio\NodeJs` and `%APPDATA%\npm` to your user `Path` in Windows Environment Variables, then open a new PowerShell window. Check `node --version` and `npm --version` before running the app.

Keep `smartstudy-ai/` as the only active app code.


## Marketability To-Do List

See `docs/marketability-todo.md` for small, clear tasks to make SmartStudy AI easier to position, package, launch, and sell.

## Monetization Model

- Freemium: limited subjects and limited AI quiz generations.
- Individual Premium: unlimited AI usage and advanced analytics.
- School plan: class dashboard, teacher management, and term reports.
