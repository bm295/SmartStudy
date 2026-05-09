# Code Review vs `docs/architecture.md`

This document lists implementation tasks still needed for the current repository to fully align with the architecture blueprint in `docs/architecture.md`.

## 1) Frontend architecture gaps (Angular 19)

### 1.1 Route protection and auth flow
- [x] Add authentication module/state (login, logout, token persistence).
- [ ] Implement `AuthGuard` for protected routes.
- [ ] Implement role-based `RoleGuard` for restricted feature access.
- [ ] Mark relevant routes in `app.routes.ts` with guard metadata.

### 1.2 HTTP/API integration
- [ ] Replace hardcoded/mock feature data with API-driven data using `HttpClient`.
- [ ] Add environment-based API base URL configuration.
- [ ] Implement a global HTTP interceptor to attach JWT on outbound requests.
- [ ] Implement refresh-token handling in interceptor (401 retry + sign-out fallback).

### 1.3 Feature-first + Facade pattern adoption
- [ ] Introduce per-feature facades (`DashboardFacade`, `PlannerFacade`, `FlashcardsFacade`, `PomodoroFacade`, `GamificationFacade`).
- [ ] Refactor components to depend on facades instead of directly instantiating or injecting lower-level services.
- [ ] Move UI mapping and async orchestration logic from components into facades.

### 1.4 State architecture consistency
- [ ] Define a consistent state strategy for all features with Signals stores/facades (currently `StudyStore` exists but is not integrated into feature flows).
- [ ] Wire shared state (`tasks`, `xp`, completion progress) into Dashboard/Pomodoro/Gamification instead of static signals.
- [ ] Add loading/error/empty states for async feature data.

### 1.5 Feature completeness in UI
- [ ] Dashboard: add deadline trends and per-subject progress views driven by real data.
- [ ] Planner: add user input form (subject/topics/deadline/available time) and dynamic plan generation.
- [ ] Flashcards/Quiz: add creation flow from uploaded/source material rather than static array.
- [ ] Pomodoro: add real timer lifecycle (start/pause/resume/finish, break handling, session history).
- [ ] Gamification: add leaderboard + badge progression sourced from events.

## 2) Backend architecture tasks (currently missing in repo)

### 2.1 Core backend services
- [ ] Scaffold NestJS API Gateway project.
- [ ] Implement Auth service (Firebase Auth or internal JWT).
- [ ] Implement Planner service endpoints and business rules.
- [ ] Implement Content AI service endpoints for quiz/flashcard generation.
- [ ] Implement Analytics service endpoints for dashboard charts/aggregations.
- [ ] Implement Realtime WebSocket gateway for live progress updates.

### 2.2 API contracts and integration
- [ ] Define versioned REST API contracts (OpenAPI/Swagger).
- [ ] Add DTO validation and error handling standards.
- [ ] Add frontend API clients/repositories aligned with backend contracts.

## 3) Data model & persistence tasks

### 3.1 Schema implementation
- [ ] Implement persistent storage for high-level entities: `users`, `subjects`, `tasks`, `focus_sessions`, `quiz_attempts`, `gamification_events`.
- [ ] Choose and set up target DB (MongoDB Atlas or PostgreSQL managed), including migration strategy.
- [ ] Add indexes/constraints for deadlines, user ownership, and analytics queries.

### 3.2 Repository pattern
- [ ] Add repository layer abstractions on backend (and optionally frontend data-access wrappers) so data-source changes are isolated.
- [ ] Replace direct local storage usage for core domain data with repository-backed persistence.

## 4) Pattern-specific tasks from architecture recommendations

### 4.1 Strategy pattern for planner
- [ ] Introduce planner strategy interface and multiple strategies (e.g., exam-cram vs spaced repetition).
- [ ] Add runtime strategy selection based on user goal/time constraints.

### 4.2 Adapter pattern for AI providers
- [ ] Add AI provider adapter interface.
- [ ] Implement OpenAI adapter as default provider.
- [ ] Add provider-agnostic usage in flashcard/quiz generation flows.

### 4.3 Observer/reactive integration
- [ ] Standardize Signal + RxJS interaction for HTTP streams and derived UI state.
- [ ] Ensure all async feature modules expose reactive VM/state from facades.

## 5) Deployment & operability tasks

- [ ] Add deployment configuration for frontend target (Vercel or Firebase Hosting).
- [ ] Add deployment configuration for backend target (Render/Railway/Fly.io).
- [ ] Add observability baseline (OpenTelemetry instrumentation + Grafana-compatible metrics/logging).
- [ ] Add environment variable management and secrets handling docs.

## 6) Roadmap-aligned feature tasks

### 6.1 MVP completion
- [ ] Complete end-to-end auth + planner + task tracking + pomodoro with persistent data.

### 6.2 AI phase
- [ ] Implement PDF/material upload pipeline.
- [ ] Implement quiz/flashcard generation from uploaded content.

### 6.3 Analytics phase
- [ ] Build advanced dashboard analytics and topic-level performance insights.

### 6.4 Community phase
- [ ] Implement classroom leaderboard and flashcard set sharing.

## 7) Engineering quality tasks

- [ ] Add unit tests for services/facades/strategies.
- [ ] Add component tests for all feature UIs.
- [ ] Add integration/e2e tests for auth, planner flow, pomodoro flow, and AI content flow.
- [ ] Set up CI checks (lint, test, build).
