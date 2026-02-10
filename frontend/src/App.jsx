import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/styles/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./pages/ForgotPassword";
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
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      </Routes>
      </Layout>
    </>
  );
};

export default App;
