# Maheswari & Balan Memorial Charitable Trust - Backend API

Professional Node.js + Express + MySQL Backend for the MBMCT NGO Management System.

---

## 🗄️ Database Configuration

- **Database Engine:** MySQL
- **Host:** `localhost`
- **Port:** `3306`
- **Database Name:** `mbmct_db`
- **User:** `root`
- **Password:** `Senthil@2003`

The server **automatically creates the database and all tables** on startup!
Alternatively, you can manually run `backend/scripts/initDb.sql` in MySQL Workbench or phpMyAdmin.

---

## 🚀 How to Run the Backend

```bash
cd backend
npm install
npm start
```

For automatic reloading during development:
```bash
npm run dev
```

---

## 🔐 Admin Credentials

- **Email:** `senthilkumar@gmail.com`
- **Password:** `Senthil@2003`
- **Portal URL:** `http://localhost:5173/admin/login`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` — Admin login (returns JWT token)
- `GET /api/auth/verify` — Verify token

### Donations
- `POST /api/donations` — Public donation submission
- `GET /api/donations` — Admin: list all donations (Protected)
- `GET /api/donations/stats` — Total amount raised and counts

### Contact Messages
- `POST /api/contacts` — Public contact message submission
- `GET /api/contacts` — Admin: list inquiries (Protected)
- `PATCH /api/contacts/:id/status` — Admin: update status (Protected)

### Volunteers
- `POST /api/volunteers` — Public volunteer registration
- `GET /api/volunteers` — Admin: list volunteers (Protected)
- `PATCH /api/volunteers/:id/status` — Admin: approve/reject volunteer (Protected)

### Beneficiaries
- `GET /api/beneficiaries` — Admin: list beneficiary cases (Protected)
- `POST /api/beneficiaries` — Admin: add beneficiary case (Protected)
- `PATCH /api/beneficiaries/:id/status` — Admin: update status (Protected)
