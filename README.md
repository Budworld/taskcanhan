
# Task Cá Nhân - Hướng dẫn chạy project

## 1. Yêu cầu
- Node.js >= 18
- .NET 8 SDK
- Docker & Docker Compose (nếu dùng DB nhanh)

## 2. Cấu hình Database (MySQL)
- Sử dụng Docker Compose:
	- DB chạy ở port **3307** (máy host) → **3306** (container)
	- User: `root` | Password: `123456`
	- Database: `taskcanhandb`
	- File cấu hình: `backend/docker-compose.yml`
	- Có thể chỉnh lại thông tin trong `backend/taskcanhanApi/appsettings.json` nếu cần.

Chạy lệnh:
```sh
cd backend
docker-compose up -d
```

## 3. Chạy backend (.NET API)
- Đảm bảo đã cài .NET 8 SDK.
- Mặc định API chạy ở **http://localhost:5156**
- Cấu hình trong: `backend/taskcanhanApi/Properties/launchSettings.json`

Chạy lệnh:
```sh
cd backend/taskcanhanApi
dotnet run
```

## 4. Chạy frontend (React + Vite)
- Mặc định gọi API ở **http://localhost:5156** (xem file `src/api/taskApi.ts`)
- Nếu muốn đổi port backend, sửa lại URL trong file này.

Chạy lệnh:
```sh
cd frontend/taskcanhan-frontend
npm install
npm run dev
```

## 5. Cấu hình .env (nếu muốn)
- Frontend không bắt buộc .env, nhưng có thể tạo file `.env` trong `frontend/taskcanhan-frontend` để cấu hình biến môi trường Vite:
	```env
	VITE_API_URL=http://localhost:5156/api/tasks
	```
	Sau đó sửa lại `taskApi.ts` để lấy từ biến môi trường:
	```ts
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5156/api/tasks';
	```

## 6. Tổng quan port
- MySQL: **3307** (host) → **3306** (container)
- Backend API: **5156**
- Frontend: **5173**

## 7. Lưu ý
- Nếu đổi port hoặc thông tin DB, cần đồng bộ ở cả docker-compose, appsettings.json và frontend.
- Nếu gặp lỗi, kiểm tra log terminal và file cấu hình.
