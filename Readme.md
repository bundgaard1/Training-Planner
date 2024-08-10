# Traning Planner

![Training Plans](images/overview.png)

## Description

Traning planner is a simple web application for runners to plan their training. The app allows users to create, edit training plans.

The app's frontend is built with React and the backend is built with Node.js and Express. The app uses a Sqlite database to store the training plans.

## To run the app

Run the frontend and backend separately.

### Frontend

```bash
cd frontend
npm install
npm start
```

(Runs on port 900 by default)

### Backend

The backend needs a .env file with the following content:
JWT_SECRET_KEY=your_secret_key
NODE_ENV=development ()
PORT=9001 (optional 3000 by default, frontend is point to configured to 3000)

```bash
cd backend
npm install
npm run dev
```
