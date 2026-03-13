import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthChecker, SecurityChecker } from "./utils";
import AdminChecker from "./utils/AdminChecker";

const SignupPage = lazy(() => import("./pages/SignupPage"));
const SigninPage = lazy(() => import("./pages/SigninPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const suspenseFallbackStyle: React.CSSProperties = {
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  fontSize: 18,
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthChecker>
              <Suspense
                fallback={<div style={suspenseFallbackStyle}>Loading</div>}
              >
                <HomePage />
              </Suspense>
            </AuthChecker>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense
              fallback={<div style={suspenseFallbackStyle}>Loading</div>}
            >
              <SignupPage />
            </Suspense>
          }
        />
        <Route
          path="/signin"
          element={
            <Suspense
              fallback={<div style={suspenseFallbackStyle}>Loading</div>}
            >
              <SigninPage />
            </Suspense>
          }
        />
        <Route
          path="/me"
          element={
            <AuthChecker>
              <Suspense
                fallback={<div style={suspenseFallbackStyle}>Loading</div>}
              >
                <ProfilePage />
              </Suspense>
            </AuthChecker>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminChecker>
              <Suspense
                fallback={<div style={suspenseFallbackStyle}>Loading</div>}
              >
                <AdminDashboard />
              </Suspense>
            </AdminChecker>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;