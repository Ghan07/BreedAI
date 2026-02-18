# AnimalATC - Image-Based Animal Type Classification

AI-powered system for morphometric measurement and ATC scoring of cattle and buffaloes from side-view images.

## Features

- 🐄 AI-based breed classification for cattle and buffaloes
- 📏 Automated morphometric measurements (body length, heart girth, height, hip width)
- 📊 ATC scoring and body condition assessment
- 📈 Dashboard with analytics and charts
- 🔐 JWT authentication
- 🌙 Dark/light mode
- 📱 Responsive design

## Tech Stack

- **Frontend:** React 18, Vite, TailwindCSS, Recharts, Framer Motion, Zustand
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Tools:** Multer (uploads), bcryptjs, helmet, CORS

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
# Install all dependencies
npm run install:all

# Copy and configure environment
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# Seed sample data
npm run seed

# Start development (both client and server)
npm run dev
```

### Demo Account
After seeding: `demo@example.com` / `password123`

### URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Health check: http://localhost:5000/api/health

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/profile | Update profile |
| PUT | /api/auth/password | Change password |
| GET | /api/classifications | List classifications |
| POST | /api/classifications | Create classification (multipart) |
| GET | /api/classifications/:id | Get single classification |
| DELETE | /api/classifications/:id | Delete classification |
| GET | /api/classifications/dashboard | Dashboard stats |

## Project Structure

```
├── server/          # Express API
│   ├── config/      # DB & app config
│   ├── controllers/ # Route handlers
│   ├── middleware/   # Auth, upload, errors
│   ├── models/      # Mongoose schemas
│   ├── routes/      # API routes
│   ├── services/    # Classification engine
│   └── seed.js      # Sample data seeder
├── client/          # React SPA
│   └── src/
│       ├── components/  # UI components
│       ├── pages/       # Route pages
│       ├── stores/      # Zustand stores
│       ├── services/    # API client
│       └── hooks/       # Custom hooks
└── README.md
```
