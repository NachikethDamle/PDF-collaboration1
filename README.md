# 📄 PDF Collaboration System

A full-stack PDF management and collaboration tool with features like PDF upload, email-based sharing, and user authentication.

---

## 🗂 Folder Structure

```
PDF-collab/
├── backend/     # Node.js + Express + MongoDB API
└── frontend/    # React UI (modern styled)
```

> ⚠️ You must run the frontend and backend **as separate apps**. They are decoupled and independently served.

---

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A Gmail account with [App Password](https://support.google.com/mail/answer/185833?hl=en) enabled

---

## 📦 Backend Setup (`/backend`)

### 1. Install dependencies
```bash
cd server
npm install
```

### 2. Create `.env` file

Make(Create) a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### 3. Start backend server
```bash
npm start
```

Your API will be live at: [http://localhost:5000](http://localhost:5000)

---

## 💡 How to Get `EMAIL_PASS` (Gmail App Password)

Gmail does **not** allow regular passwords to be used in apps. You must generate an App Password:

### ✨ Steps:

1. Go to your [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Then go to **App Passwords**
4. Choose **Mail** as the app, and **Other** → "PDFCollab"
5. Click **Generate**
6. Copy the 16-digit password and use it as `EMAIL_PASS` in your `.env`

> 📧 This allows Nodemailer to send emails from your Gmail securely and If confused about app password then you will find many youtube videos regarding it.

---

## 💻 Frontend Setup (`/frontend`)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start the frontend
```bash
npm start
```

Your app will be live at: [http://localhost:3000](http://localhost:3000)

> The frontend is set up to proxy API requests to the backend via `package.json`.

---

## ✨ Features

- 📄 Upload PDFs
- ✉️ Share PDFs via email
- 🔐 Secure login/signup
- 🧾 Clean dashboard UI
- 🧹 Fully styled with modern CSS

---

## ❓ Common Issues

- **MongoDB connection errors** → check `MONGO_URI` and ensure MongoDB is running
- **Email not sending** → verify you used an App Password (not Gmail password)
- **404 from frontend** → make sure backend is running on port `5000` and frontend has correct proxy

---

## ✅ Todo / Improvements

- 🔒 Simultaneous team interaction
- 📥 Shared PDF viewer
- ☁️ Deploy backend (Render) and frontend (Vercel)

---

