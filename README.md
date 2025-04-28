# RoomieMatch

A roommate finder web application built with Next.js and React, designed to help Case Western Reserve University (CWRU) students connect with compatible roommates based on lifestyle preferences.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Demo](#demo)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Environment Variables](#environment-variables)  
  - [Running Locally](#running-locally)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Authentication](#authentication)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  


---

## About

RoomieMatch helps CWRU students find roommates who share similar living habits, interests, and schedules. By completing a short questionnaire on cleanliness, noise tolerance, sleep patterns, and hobbies, RoomieMatch calculates a compatibility score and ranks potential roommates for you.

---

## Features

- **Single Sign-On (SSO)** with Google OAuth 2.0 — restricted to `@case.edu` emails  
- **Questionnaire** on living habits (cleanliness, noise, guests, pets, etc.)  
- **Compatibility scoring** and ranked roommate list  
- **Profile pages** with photo, bio, and preference tags  
- **Delete profile** option to remove your data at any time  
- **Email notifications** when new high-score matches are available  

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Authentication:** NextAuth.js (Google OAuth)  
- **Backend:** Flask API deployed on Azure App Service  
- **Database:** PostgreSQL (hosted on Azure Database for PostgreSQL)  
- **Deployment:** Vercel (frontend) & Azure App Service (backend)  

---

## Demo

> **Frontend:** https://roomiematch.vercel.app  

---

## Getting Started

### Prerequisites

- Node.js ≥ 16  
- npm or yarn  
- Python ≥ 3.8  
- A Google Cloud project with OAuth credentials  

### Installation

1. **Clone the repos**  
   ```bash
   git clone https://github.com/jxnnyzhang/RoomieMatch-frontend.git
   git clone https://github.com/IsabellaFrancesconi/roomiematch-backend.git

Install frontend dependencies
cd RoomieMatch-frontend
npm install
# or
yarn

Install backend dependencies
cd ../roomiematch-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Environment Variables

Create a .env.local in the frontend directory:
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-random-secret>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
CAS_SERVER_URL=<your-cas-server-url>

Create a .env in the backend directory:
FLASK_ENV=development
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/roomiematch
SECRET_KEY=<your-flask-secret>

Running Locally

Start the backend
cd roomiematch-backend
flask run --host=0.0.0.0 --port=5000

Start the frontend
cd ../RoomieMatch-frontend
npm run dev
# Frontend on http://localhost:3000
# Backend API on http://localhost:5000

Usage
Navigate to http://localhost:3000 and click Sign in with Case.
Complete the roommate questionnaire.
View your compatibility‐ranked matches on the Matches page.
Click View Profile to see details or send a match request.

API Endpoints
Method	Endpoint	Description
GET	/api/profile/<userId>	Fetch logged-in user’s profile data
POST	/api/questionnaire	Submit questionnaire responses
GET	/api/matches?userId=<userId>	Retrieve list of ranked matches
DELETE	/api/profile/<userId>	Delete user profile and all associated data

Authentication
We use NextAuth.js to handle:
Google OAuth 2.0 — users sign in with their CWRU (@case.edu) Google account.
Email restriction — a simple server-side check blocks non-@case.edu domains.


Deployment

Frontend (Vercel)
Push RoomieMatch-frontend to GitHub.
Import the project into Vercel.
Add the same environment variables in the Vercel dashboard.
Deploy — your site will be live at https://roomiematch.vercel.app.

Backend (Azure App Service)
Push roomiematch-backend to GitHub.
Create an Azure App Service instance (Linux, Python 3.8+).
Configure environment variables under Settings ➞ Configuration.
Enable CORS for your Vercel domain (https://roomiematch.vercel.app).
Deploy via GitHub Actions or the Azure CLI.

Contributing
Fork the repository.

Create a branch:
git checkout -b feature/YourFeature

Commit your changes:
git commit -m "Add YourFeature"

Push to your fork:
git push origin feature/YourFeature

Open a Pull Request and describe your changes.