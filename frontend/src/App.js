// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CreatePlanPage from "./pages/CreatePlanPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="createPlan" element={<CreatePlanPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
