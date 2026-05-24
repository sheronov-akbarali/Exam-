# Fullstack Task Manager

Express, MongoDB, Mongoose, JWT, Bcrypt, React va Tailwind CSS bilan yozilgan task manager.

## Ishga tushirish

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend `http://localhost:5001`, frontend `http://localhost:5173` da ishlaydi.

## Asosiy imkoniyatlar

- Register, login, logout va refresh token.
- Task CRUD, status yangilash va owner tekshiruvi.
- Token muddati tugaganda axios avtomatik refresh qiladi.
- Login qilmagan foydalanuvchi dashboardga kira olmaydi.
- Dashboard TODO, IN_PROGRESS va DONE ustunlariga ajratilgan.
