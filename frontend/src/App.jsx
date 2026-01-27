import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import NotFoundPage from "./pages/NotFoundPage";
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
