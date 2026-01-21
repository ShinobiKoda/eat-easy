import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Splash from "./components/onboarding/Splash";
import GetStarted from "./components/onboarding/GetStarted";
import SignUpMethod from "./components/auth/SignUpMethod";
import Signup from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import Welcome from "./components/dashboard/Welcome";
import Virtual from "./components/onboarding/Virtual";
import Recommend from "./components/dashboard/Recommend";
import FullMenu from "./components/FullMenu/Full-menu";
import Step1 from "./components/onboarding/Step1";
import { useTheme } from "./hooks/useTheme";
import ConfirmLink from "./components/auth/ConfirmLink";
import ResetEmailSent from "./components/auth/ResetEmailSent";
import ResetPassword from "./components/auth/ResetPassword";
import SetLocation from "./components/onboarding/SetLocation";
import Sidebar from "./components/layout/Sidebar";
import SelectRestaurant from "./components/onboarding/SelectRestaurant";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import SetCustomLocation from "./components/onboarding/SetCustomLocation";

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
            path="/set-custom-location"
            element={
              <ProtectedRoute>
                <SetCustomLocation />
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
                <SetLocation />
              </ProtectedRoute>
            }
          />

          <Route
            path="FullMenu"
            element={
              <ProtectedRoute>
                <FullMenu />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
