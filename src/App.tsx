import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Splash from "./components/Splash";
import GetStarted from "./components/GetStarted";
import SignUpMethod from "./components/auth/SignUpMethod";
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Locations from "./components/Locations";
import Welcome from "./components/Welcome";
import Virtual from "./components/Virtual";
import Recommend from "./components/Recommend";
import Step1 from "./components/Step1";
import { useTheme } from "./hooks/useTheme";
import ConfirmLink from "./components/auth/ConfirmLink";
import ResetEmailSent from "./components/auth/ResetEmailSent";
import ResetPassword from "./components/auth/ResetPassword";
import SetLocation from "./components/SetLocation";
import Sidebar from "./components/layout/Sidebar";
import SelectRestaurant from "./components/SelectRestaurant";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
  const location = useLocation();
  useEffect(() => {
    // scroll immediately to top when pathname changes
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const path = location.pathname;
  const excludedPaths = new Set([
    "/", // Splash
    "/get-started",
    "/method",
    "/signup",
    "/login",
    "/forgot-password",
    "/verify-url",
    "/reset-email-sent",
    "/reset-password",
  ]);
  const excludedPrefixes: string[] = [
    // Add future sections to exclude by prefix here, e.g. "/auth"
  ];

  const isExcluded =
    excludedPaths.has(path) || excludedPrefixes.some((p) => path.startsWith(p));
  const showSidebar = !isExcluded;

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ open: boolean }>).detail;
      if (detail && typeof detail.open === "boolean") {
        setSidebarOpen(detail.open);
      }
    };
    window.addEventListener("sidebar-state", handler as EventListener);
    return () =>
      window.removeEventListener("sidebar-state", handler as EventListener);
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ backgroundImage }}>
      {showSidebar && <Sidebar />}
      <div
        className={`transition-all duration-300 ${
          showSidebar ? (sidebarOpen ? "md:ml-[260px]" : "md:ml-36") : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/get-started" element={<GetStarted />} />

          <Route
            path="/method"
            element={
              <PublicRoute>
                <SignUpMethod />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/verify-url" element={<ConfirmLink />} />
          <Route
            path="/reset-email-sent"
            element={
              <PublicRoute>
                <ResetEmailSent />
              </PublicRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes - require authentication */}
          <Route
            path="/set-location"
            element={
              <ProtectedRoute>
                <SetLocation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/set-restaurant"
            element={
              <ProtectedRoute>
                <SelectRestaurant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locations"
            element={
              <ProtectedRoute>
                <Locations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/virtual"
            element={
              <ProtectedRoute>
                <Virtual />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommend"
            element={
              <ProtectedRoute>
                <Recommend />
              </ProtectedRoute>
            }
          />
          <Route
            path="/step1"
            element={
              <ProtectedRoute>
                <Step1 />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
