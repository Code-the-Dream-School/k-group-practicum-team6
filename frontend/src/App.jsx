import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import NotFoundPage from "./pages/NotFoundPage";
import DashBoard from "./pages/DashBoard";
import { EntryProvider } from "./contexts/EntryContext.jsx";
import { StatsProvider } from "./contexts/StatsContext.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <EntryProvider>
                <StatsProvider>
                <DashBoard />
                </StatsProvider>
              </EntryProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
