# SmartStudy AI – Architecture Blueprint

## 1) Product modules

- **Dashboard**: tổng hợp tiến độ theo môn + deadline + xu hướng học.
- **Planner AI**: phân rã mục tiêu lớn thành task nhỏ theo thời gian còn lại.
- **Flashcard/Quiz AI**: tạo nội dung ôn tập từ tài liệu học.
- **Pomodoro**: quản lý phiên tập trung và thời gian nghỉ.
- **Gamification**: XP, level, badge, leaderboard.

## 2) Frontend architecture (Angular 19)

- Standalone components theo từng feature.
- Router lazy-loading toàn bộ feature routes.
- State cục bộ dùng Angular Signals.
- Data async từ API qua RxJS + HttpClient.
- Auth guard, role guard cho route bảo mật.
- HTTP interceptor để gắn JWT và xử lý refresh token.

## 3) Backend architecture (suggested)

- **NestJS API Gateway**.
- **Auth**: Firebase Authentication hoặc JWT nội bộ.
- **Planner Service**: xử lý thuật toán lập kế hoạch.
- **Content AI Service**: gọi OpenAI API để sinh quiz/flashcard.
- **Analytics Service**: tổng hợp dữ liệu học để render biểu đồ.
- **Realtime Gateway**: WebSocket cập nhật tiến độ học theo thời gian thực.

## 4) Data model (high-level)

- `users`: hồ sơ người dùng, mục tiêu học tập.
- `subjects`: danh sách môn học, độ ưu tiên.
- `tasks`: task học tập, deadline, trạng thái.
- `focus_sessions`: lịch sử Pomodoro.
- `quiz_attempts`: kết quả làm quiz theo chủ đề.
- `gamification_events`: nguồn phát sinh XP/badge.

## 5) Deployment notes

- Frontend deploy: Vercel / Firebase Hosting.
- Backend deploy: Render / Railway / Fly.io.
- Database: MongoDB Atlas hoặc PostgreSQL managed.
- Monitoring: OpenTelemetry + Grafana stack (tuỳ quy mô).

## 6) Suggested roadmap

1. MVP: auth + planner + task tracking + pomodoro.
2. AI phase: upload PDF + quiz generation.
3. Analytics phase: dashboard nâng cao + học lực theo chủ đề.
4. Community phase: leaderboard lớp học + chia sẻ bộ flashcard.
