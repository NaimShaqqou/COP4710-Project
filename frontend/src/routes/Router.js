import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages import
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import CreateSurveyPage from "../pages/CreateSurveyPage";
import Home from "../pages/Home";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createSurvey" element={<CreateSurveyPage/>} />
    </Routes>
  );
}

export default Router;
