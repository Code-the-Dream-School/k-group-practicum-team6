import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/styles/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import NotFoundPage from "./pages/NotFoundPage";
import DashBoard from "./pages/DashBoard";

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
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
