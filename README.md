# 🏋️ Salle de Sport — Backend API

> REST API for a complete gym management system, built with Node.js, Express & MongoDB.
> 
> 🔗 **Frontend Repository:** [sportify-front](https://github.com/manel-hamdeni/sportify-front)

---

## 📌 About The Project

A full-featured gym management backend with role-based access control (Admin, Coach, Client, Internaute), JWT authentication, session planning, internal messaging, and notifications.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Architecture | MVC (Model-View-Controller) |

---

## 👤 User Roles

| Role | Access |
|---|---|
| `admin` | Full access — manage users, planning, gym info |
| `coach` | View planning, client profiles |
| `client` | Register for sessions, manage subscription |
| `internaute` | View courses, coaches, gym info |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone https://github.com/manel-hamdeni/salle-sport-backend.git
cd salle-sport-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your MongoDB URI and JWT secret

# Start the server
npm start
```

### Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

---

## 📋 API Endpoints

### 🔐 Auth — `/api/auth`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/inscription` | Public | Register |
| POST | `/api/auth/connexion` | Public | Login |
| GET | `/api/auth/moi` | Private | My profile |
| PUT | `/api/auth/modifier-mot-de-passe` | Private | Change password |

### 👥 Users — `/api/users`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/users` | Admin | All users |
| GET | `/api/users/:id` | Private | Single user |
| PUT | `/api/users/:id` | Private | Update user |
| DELETE | `/api/users/:id` | Admin | Delete user |
| GET | `/api/users/coachs/disponibles` | Public | Available coaches |
| GET | `/api/users/stats` | Admin | Statistics |

### 📅 Planning — `/api/planning`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/planning` | Public | All sessions |
| POST | `/api/planning` | Admin | Create session |
| PUT | `/api/planning/:id` | Admin | Update session |
| DELETE | `/api/planning/:id` | Admin | Delete session |
| POST | `/api/planning/:id/inscription` | Client | Join session |
| DELETE | `/api/planning/:id/inscription` | Client | Leave session |

### 💬 Messages — `/api/messages`
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/messages` | Private | Send message |
| GET | `/api/messages/recus` | Private | Inbox |
| GET | `/api/messages/envoyes` | Private | Sent messages |
| PUT | `/api/messages/:id/lu` | Private | Mark as read |

### 🔔 Notifications — `/api/notifications`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/notifications` | Private | My notifications |
| PUT | `/api/notifications/:id/lu` | Private | Mark as read |
| DELETE | `/api/notifications/:id` | Private | Delete |

### 🏢 Gym — `/api/salle`
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/api/salle` | Public | Gym info |
| POST | `/api/salle` | Admin | Create gym |
| PUT | `/api/salle/:id` | Admin | Update gym |

---

## 🔑 Authentication

After login, include the JWT token in every protected request:

```
Authorization: Bearer <your_token>
```

---

## 📁 Project Structure

```
salle-sport-backend/
├── config/         # MongoDB connection
├── models/         # Mongoose schemas (User, Coach, Client, Planning...)
├── controllers/    # Business logic
├── routes/         # API routes
├── middlewares/    # JWT auth + role verification
└── server.js       # Entry point
```

---

## 👩‍💻 Author

**Manel Hamdeni** — 3rd Year Fullstack Developer Student @ ISET Zaghouan

[![LinkedIn](https://img.shields.io/badge/LinkedIn-manel--hamdeni-blue)](https://www.linkedin.com/in/manel-hamdeni-ba0281377/)
[![GitHub](https://img.shields.io/badge/GitHub-manel--hamdeni-black)](https://github.com/manel-hamdeni)
