import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/styles/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage";
import DashBoard from "./pages/DashBoard";
import { EntryProvider } from "./contexts/EntryContext.jsx";
import { StatsProvider } from "./contexts/StatsContext.jsx";

const App = () => {
  return (
    <>
    <Layout>
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
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/resetPassword" element={<ResetPassword/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Layout>
    </>
  );
};

export default App;
