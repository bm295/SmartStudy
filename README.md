# 🚀 SmartStudy AI

Nền tảng học tập thông minh cho học sinh, sinh viên, tập trung vào việc **lập kế hoạch tự động**, **theo dõi tiến độ**, **ôn tập thông minh bằng flashcard/quiz**, và **duy trì sự tập trung bằng Pomodoro + gamification**.

## ✨ Giá trị cốt lõi

- Giúp người học tránh học dồn sát deadline.
- Hiển thị rõ môn nào đang yếu thông qua dashboard phân tích.
- Quản lý nhiều môn học trong một lộ trình thống nhất.
- Tạo động lực học mỗi ngày bằng XP, level, badge và leaderboard.

## 🧩 Tính năng chính

1. **Dashboard thông minh**
   - Biểu đồ tiến độ theo môn.
   - Tỷ lệ hoàn thành task theo tuần/tháng.
   - Cảnh báo deadline sắp đến.

2. **AI Study Planner**
   - Nhập deadline học phần hoặc kỳ thi.
   - Tự động chia nhỏ task theo thời gian còn lại.
   - Tự điều chỉnh kế hoạch nếu người dùng bỏ lỡ buổi học.

3. **Flashcard & Quiz Generator**
   - Upload tài liệu (PDF) để trích xuất nội dung.
   - Sinh flashcard và câu hỏi trắc nghiệm.
   - Chấm điểm và thống kê độ chính xác theo chủ đề.

4. **Pomodoro Focus Mode**
   - Đồng hồ Pomodoro (focus/break).
   - Theo dõi số phiên tập trung mỗi ngày.
   - Thống kê thời gian học theo tuần.

5. **Gamification**
   - XP / level / badge theo thành tích.
   - Bảng xếp hạng lớp học hoặc nhóm học.

## 🏗️ Kiến trúc đề xuất

### Frontend (Angular 19)
- Standalone Components.
- Angular Signals cho state local/reactive UI.
- Lazy loaded routes cho từng module tính năng.
- Angular Material hoặc TailwindCSS.
- Guards + Interceptors cho bảo mật và API flow.
- SSR (tùy chọn) nếu cần SEO.

### Backend (gợi ý)
- NestJS (Node.js).
- MongoDB hoặc PostgreSQL.
- Firebase Authentication.
- OpenAI API để tạo quiz/flashcard thông minh.
- WebSocket cho đồng bộ tiến độ realtime.

## 📁 Cấu trúc repo hiện tại

- `src/`:
  - App shell, routes, feature components dạng standalone.
  - Store dựa trên Angular Signals cho dữ liệu học tập.
- `docs/architecture.md`:
  - Luồng nghiệp vụ, schema dữ liệu và roadmap triển khai.
- `Archived/`:
  - Toàn bộ mã cũ đã được lưu trữ.

## 🚀 Bắt đầu nhanh (định hướng)

```bash
npm install
npm run start
```

> Lưu ý: repo hiện ở mức **blueprint + starter code** để phục vụ đồ án/POC. Có thể mở rộng trực tiếp sang Angular CLI workspace đầy đủ.

## 💸 Mô hình kiếm tiền

- **Freemium**: giới hạn số môn học và số lượt tạo quiz AI.
- **Premium cá nhân**: không giới hạn AI + analytics nâng cao.
- **Gói trường học**: dashboard lớp học, quản lý giáo viên, báo cáo theo học kỳ.
