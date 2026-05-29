# Student Management System — MERN Stack
## Assignment 4 | Department of IT | CIT Coimbatore

---

## Project Structure

```
mern-assignment/
├── backend/
│   ├── server.js         ← Express server + CRUD API routes + error handling
│   ├── studentModel.js   ← Mongoose Schema & Model
│   ├── package.json
│   └── .env              ← MongoDB connection URI
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.jsx       ← Full React app with hooks, validation, CRUD UI
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## Setup & Running

### Prerequisites
- Node.js v16+
- MongoDB running locally on port 27017

### 1. Start the Backend
```bash
cd backend
npm install
npm start
# Server runs at http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
# App opens at http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| POST   | /api/students          | Create a new student     |
| GET    | /api/students          | Fetch all students       |
| GET    | /api/students/:id      | Fetch one student        |
| PUT    | /api/students/:id      | Update a student         |
| DELETE | /api/students/:id      | Delete a student         |

---

## Rubric Coverage

| Component                       | Implementation                                              |
|---------------------------------|-------------------------------------------------------------|
| MongoDB Connection Setup (3)    | `connectDB()` in server.js with error handling & events     |
| Mongoose Schema (3)             | `studentSchema` in studentModel.js — typed fields + validators |
| Mongoose Model (2)              | `Student` model exported and used for all DB operations     |
| CRUD Operations (5)             | All 5 REST endpoints fully implemented in server.js         |
| Error Handling (2)              | Try/catch on every route, duplicate key, validation, 404, 500 |

---

## React Features Used
- `useState` — form state, student list, loading, toasts
- `useEffect` — fetch on mount
- `useCallback` — stable fetch/toast references
- Form validation with field-level error messages
- Controlled inputs with live feedback
