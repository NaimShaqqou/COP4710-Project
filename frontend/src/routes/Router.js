import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages import
import LoginPage from "../pages/Authentication/LoginPage";
import RegisterPage from "../pages/Authentication/RegisterPage";
import CreateSurveyPage from "../pages/CreateSurveyPage";
import TakeSurvey from "../pages/TakeSurvey"
import ViewSurveys from "../pages/ViewSurveys"
import Home from "../pages/Home";
import MySurveys from "../pages/MySurveys";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/createSurvey" element={<CreateSurveyPage/>} />
      <Route path="/takeSurvey" element={<TakeSurvey/>} />
      <Route path="/viewSurveys" element={<ViewSurveys/>} />
      <Route path="/mySurveys" element={<MySurveys/>} />
    </Routes>
  );
}

export default Router;
