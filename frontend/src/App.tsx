// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CreatePlanPage from "./pages/CreatePlanPage";
import LoginPage from "./pages/LoginPage";
import PlansPage from "./pages/PlansPage";
import DashboardPage from "./pages/DashboardPage";
import PreferencesPage from "./pages/PreferencesPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route index element={< HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="createPlan" element={<CreatePlanPage />} />
          <Route path="preferences" element={<PreferencesPage />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
