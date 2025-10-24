# 🧩 Project Management App

A full-stack project management application built with **NestJS** (backend) and **React + TypeScript** (frontend).  
It allows users to manage **projects**, create **tasks**, and organize work efficiently with authentication and pagination.

---

## 🚀 Tech Stack

**Frontend:**
- React + TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- Vite

**Backend:**
- NestJS
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing

---

## ⚙️ Prerequisites

Make sure you have installed:
- Node.js (v18+ or v20)
- npm or yarn
- MongoDB (local instance or Atlas)

---

## 🖥️ Backend Setup (NestJS)

1. Open terminal and go to backend folder:
2.Install dependencies:

npm install


Create a .env file in the backend root folder:

MONGO_URI=mongodb://localhost:27017/project_management
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
PORT=5000


Run the backend server:

npm run start:dev


Backend should now be running at:
 http://localhost:5000


 Frontend Setup (React + Vite)

Open a new terminal and go to frontend folder:

cd frontend


Install dependencies:

npm install


Create a .env file in the frontend root folder:

VITE_API_URL=http://localhost:5000


Start the frontend development server:

npm run dev


Open your browser and go to:
👉 http://localhost:5173
 (default Vite port)

🌱 Seeders

To populate the database with demo users, projects, and tasks:

Inside backend/src/seeders/ (or create a seed.ts), add your seed data.

Run the seeder script:

npm run seed


Example seeder script (backend/src/seed.ts):

import { connect } from "mongoose";
import { Project } from "../projects/schemas/project.schema";
import { User } from "../auth/schemas/user.schema";

async function seed() {
  await connect("mongodb://localhost:27017/project_management");

  const demoUser = await User.create({
    email: "demo@example.com",
    password: "password123", // hashed automatically by auth service
  });

  await Project.create({
    title: "Demo Project",
    description: "This is a seeded project",
    status: "active",
    user: demoUser._id,
  });

  console.log("Database seeded ✅");
  process.exit(0);
}

seed();

✨ Features

✅ Authentication & Authorization

JWT + Refresh Token mechanism

Secure cookies for access tokens

✅ Projects Module

Create, edit, delete, and list projects

Pagination & filtering

✅ Tasks Module

Add, edit, delete tasks linked to a project

Status-based filtering (To Do, In Progress, Done)

✅ User Experience

Fully responsive

Protected routes

Automatic token refresh every 14 minutes
