import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import ForgotPasswordPage from "./pages/ForgotPass";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateDeckPage from "./pages/CreateDeck";
import FeedPage from "./pages/Feed";

import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgotPass" element={<ForgotPasswordPage />} />
          <Route path="/feed" element={<FeedPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/create-deck"
            element={
              <ProtectedRoute>
                <CreateDeckPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
