import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginRegister from "./pages/LoginRegister";
import NotFoundPage from "./pages/NotFoundPage";

const DashBoard = React.lazy(() => import("./pages/DashBoard"));
const NewEntry = React.lazy(() => import("./pages/NewEntry"));
const EditEntry = React.lazy(() => import("./pages/EditEntry"));
const UserEntries = React.lazy(() => import("./pages/Entries"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading Dashboard...</div>}>
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/newentry"
          element={
            <Suspense fallback={<div>Loading entry form...</div>}>
              <ProtectedRoute>
                <NewEntry />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/editentry"
          element={
            <Suspense fallback={<div>Loading entry editing...</div>}>
              <ProtectedRoute>
                <EditEntry />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/userentries"
          element={
            <Suspense fallback={<div>Loading user entries...</div>}>
              <ProtectedRoute>
                <UserEntries />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
