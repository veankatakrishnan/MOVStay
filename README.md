# MOV Stay 🏠
### Match · Optimize · Verify — AI-assisted PG & Hostel Discovery for Students

---

## What Is MOV Stay?

MOV Stay is a student-centric accommodation platform with three roles:

| Role | Capabilities |
|---|---|
| **Student** | Browse listings, send enquiries, roommate matching, AI recommendations |
| **Owner** | Create & manage PG/Hostel listings, respond to enquiries, view analytics |
| **Admin** | Moderate listings & reviews, manage users, view platform reports |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens) |
| AI (Planned) | Custom ML service / OpenAI / Gemini |
| Real-time (Planned) | Socket.IO |

---

## Folder Structure

```
MOV Stay/
├── backend/
│   ├── config/
│   │   ├── db.js               ← MongoDB connection (Mongoose)
│   │   └── env.js              ← Centralised env vars
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── listingController.js
│   │   ├── enquiryController.js
│   │   ├── reviewController.js
│   │   ├── roommateController.js
│   │   ├── adminController.js
│   │   └── reportController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   ← JWT verify → req.user
│   │   ├── roleMiddleware.js   ← authorize('admin', 'owner')
│   │   └── errorHandler.js    ← Global error handler
│   ├── models/
│   │   ├── User.js             ← role: student | owner | admin
│   │   ├── Listing.js          ← PG/Hostel with AI placeholder fields
│   │   ├── Enquiry.js
│   │   ├── Review.js
│   │   ├── RoommateProfile.js  ← Lifestyle vectors for AI matching
│   │   └── Notification.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── listingRoutes.js
│   │   ├── enquiryRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── roommateRoutes.js
│   │   ├── adminRoutes.js
│   │   └── reportRoutes.js
│   ├── services/
│   │   ├── aiService.js        ← AI integration placeholder
│   │   └── emailService.js     ← Email notification placeholder
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── validators.js
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/                   ← Vite + React
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Sidebar.jsx          ← Role-aware nav links
    │   │   ├── ListingCard.jsx
    │   │   ├── SearchBar.jsx
    │   │   ├── FilterPanel.jsx
    │   │   ├── ProtectedRoute.jsx   ← Role-based guard
    │   │   ├── ChatBox.jsx          ← Socket.IO placeholder
    │   │   ├── NeighborhoodPanel.jsx← Maps API placeholder
    │   │   └── RecommendationSection.jsx ← AI placeholder
    │   ├── context/
    │   │   └── AuthContext.jsx      ← Global auth state + hooks
    │   ├── hooks/
    │   │   └── useListings.js
    │   ├── layouts/
    │   │   ├── MainLayout.jsx
    │   │   └── DashboardLayout.jsx
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── ListingsPage.jsx
    │   │   ├── ListingDetailsPage.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── OwnerDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AddListingPage.jsx
    │   │   ├── ReportsPage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── routes/
    │   │   └── AppRouter.jsx        ← Role-based React Router v6 config
    │   ├── services/
    │   │   ├── api.js               ← Axios instance (interceptors)
    │   │   ├── authService.js
    │   │   ├── listingService.js
    │   │   ├── roommateService.js
    │   │   └── reportService.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

---

## REST API Routes

| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |
| GET | `/api/listings` | Public |
| POST | `/api/listings` | Owner |
| PUT | `/api/listings/:id` | Owner |
| DELETE | `/api/listings/:id` | Owner / Admin |
| POST | `/api/enquiries` | Student |
| GET | `/api/enquiries/received` | Owner |
| POST | `/api/reviews` | Student |
| GET | `/api/roommate/matches` | Student (AI pending) |
| GET | `/api/admin/listings/pending` | Admin |
| PUT | `/api/admin/listings/:id` | Admin |
| GET | `/api/reports/platform` | Admin |
| GET | `/api/reports/owner` | Owner |

---

## Architecture Decisions

| Decision | Rationale |
|---|---|
| **MVC pattern** | Models → Controllers → Routes — clean separation of concerns |
| **Centralised `env.js`** | Single import for all config, easy to swap with cloud secrets vault |
| **`authorize()` middleware factory** | One function, pass any roles — zero duplication across routes |
| **Axios interceptors** | Global token injection and 401 redirect — no per-call boilerplate |
| **AuthContext + `useAuth` hook** | React-idiomatic auth — avoids prop drilling, composable with router |
| **Layout routes (React Router v6)** | `MainLayout` vs `DashboardLayout` via `<Outlet>` — DRY and composable |
| **Vite** | Faster HMR, ESM-native, smaller bundle than Create React App |
| **Service layer** | All Axios calls in `/services` — easy to mock for testing |

---

## AI Integration Points (Planned)

| Feature | Backend Hook | Frontend Hook |
|---|---|---|
| Listing Recommendations | `aiService.getRecommendedListings()` → `listingController` | `RecommendationSection.jsx` |
| Roommate Matching | `aiService.getRoommateMatches()` → `roommateController` | Student Dashboard |
| Content Moderation | `adminController.getFlaggedReviews()` | Admin Dashboard |
| Smart Search Ranking | `listingController.getAllListings()` | `SearchBar.jsx` |

---

## Analytics Integration Points (Planned)

| Report | Backend | Frontend |
|---|---|---|
| Platform stats | `reportController.getPlatformReport()` — MongoDB aggregations | `AdminDashboard.jsx` |
| Owner analytics | `reportController.getOwnerReport()` — views, funnel, occupancy | `OwnerDashboard.jsx` |
| Charts library | — | Recharts or Chart.js in `ReportsPage.jsx` |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### Backend
```bash
cd backend
copy .env.example .env    # Fill in MONGO_URI and JWT_SECRET
npm install
npm run dev               # nodemon → http://localhost:5000
```

### Frontend
```bash
cd frontend
copy .env.example .env
npm install
npm run dev               # Vite → http://localhost:5173
```

---

## Environment Variables

### `backend/.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/movstay
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### `frontend/.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Core Modules Status

| Module | Status |
|---|---|
| Authentication (JWT) | ✅ Structure ready |
| Listing CRUD | ✅ Structure ready |
| Enquiry Flow | ✅ Structure ready |
| Reviews | ✅ Structure ready |
| Admin Moderation | ✅ Structure ready |
| Reports & Analytics | ✅ Structure ready |
| AI Recommendations | 🔲 Placeholder — to be integrated |
| Roommate Matching AI | 🔲 Placeholder — to be integrated |
| Chat (Socket.IO) | 🔲 Placeholder — to be integrated |
| Neighbourhood Dashboard | 🔲 Placeholder — Maps API integration pending |

---

*Built with ❤️ for students — MOV Stay: Match · Optimize · Verify*
