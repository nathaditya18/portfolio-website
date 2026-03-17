# 🌐 Portfolio — Full Stack Website

A modern single-page portfolio website built with **HTML5, CSS3, JavaScript** (Frontend), **Node.js + Express** (Backend), and **MySQL** (Database). Hosted on **Render**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Hosting | Render |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
portfolio/
├── server.js            # Node.js + Express backend
├── package.json         # npm config & dependencies
├── .env                 # Environment variables (not in git)
├── render.yaml          # Render deployment config
├── .gitignore
├── database/
│   └── schema.sql       # MySQL schema + seed data
└── public/              # Frontend static files
    ├── index.html       # Single page application
    ├── css/
    │   └── style.css    # Dark theme with glassmorphism
    └── js/
        └── main.js      # Frontend JS (Fetch API calls)
```

---

## 🛠️ Local Setup

### Prerequisites
- [Node.js 18+](https://nodejs.org/en/download/) 
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- Git

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### Step 2 — Set Up MySQL Database

1. Open MySQL Workbench or MySQL CLI
2. Run the schema file:
```sql
source database/schema.sql;
```
OR in MySQL CLI:
```bash
mysql -u root -ptiger < database/schema.sql
```

### Step 3 — Configure Environment Variables

Create a `.env` file in the root:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tiger
DB_NAME=portfolio_db
PORT=3000
```

### Step 4 — Install Dependencies & Start

```bash
npm install
npm start
```

Open your browser at: **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Fetch portfolio profile data |
| GET | `/api/skills` | Fetch all skills |
| GET | `/api/projects` | Fetch all projects |
| POST | `/api/contact` | Submit contact form message |
| GET | `/api/contacts` | View all contact submissions |

---

## ☁️ Deploying to Render

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Full stack portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### Step 2 — Create Render Web Service
1. Go to [render.com](https://render.com) and sign up
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Set configuration:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add Environment Variables:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### Step 3 — Set Up MySQL on Render
> **Note:** Render's free tier provides PostgreSQL. For MySQL, use one of:
> - **PlanetScale** (free MySQL hosting): https://planetscale.com
> - **Aiven** (free MySQL tier): https://aiven.io
> - **Railway** (free MySQL): https://railway.app

After getting your free MySQL credentials, update the environment variables in Render dashboard.

### Step 4 — Run Schema on Remote DB
Use your MySQL provider's dashboard or connection string to run `database/schema.sql`.

---

## 🎨 Features

- ✅ Responsive single-page design (mobile-first)
- ✅ Dark glassmorphism theme with animated gradient orbs
- ✅ Typing animation in hero section
- ✅ Scroll reveal animations
- ✅ Animated skill progress bars
- ✅ Skill category filtering
- ✅ Project cards with hover overlay
- ✅ Contact form connected to MySQL
- ✅ Sticky navbar with active link highlighting
- ✅ Back-to-top button
- ✅ Toast notifications
- ✅ SEO meta tags

---

## 📝 Database Tables

| Table | Purpose |
|-------|---------|
| `profile` | Portfolio owner's info |
| `skills` | Skills with category & level |
| `projects` | Projects with links & images |
| `contacts` | Contact form submissions |

---

## 📄 License

MIT © 2026 Alex Johnson
