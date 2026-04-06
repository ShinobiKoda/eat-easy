import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Splash from "./pages/Splash";
import GetStarted from "./pages/GetStarted";
import SignUpMethod from "./pages/auth/SignUpMethod";
import Signup from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Welcome from "./pages/Welcome";
import Virtual from "./pages/VirtualAssistant/VirtualAssitantHomepage";
import Recommend from "./components/AI-Assistant/Recommend";
import Recommended from "./pages/VirtualAssistant/ShowVirtualAssistantRecommendations";
import SmartAssistant from "./pages/VirtualAssistant/VirtualAssistantWelcomeBackPage";
import FullMenu from "./pages/FullMenu";
import OrderStatus from "./pages/OrderStatus";
import Step1 from "./pages/VirtualAssistant/ChooseFeeling";
import Step2Budget from "./pages/VirtualAssistant/ChooseBudget";
import Step3Party from "./pages/VirtualAssistant/ChoosePopulation";
import Step4FoodType from "./pages/VirtualAssistant/ChooseFoodType";
import Generating from "./pages/VirtualAssistant/GenerateAIRecommendations";
import { useTheme } from "./hooks/useTheme";
import ConfirmLink from "./pages/auth/ConfirmLink";
import ResetEmailSent from "./pages/auth/ResetEmailSent";
import ResetPassword from "./pages/auth/ResetPassword";
import SetLocation from "./pages/SetLocation";
import Sidebar from "./components/layout/Sidebar";
import SelectRestaurant from "./pages/SelectRestaurant";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import PublicRoute from "./pages/auth/PublicRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import SetCustomLocation from "./pages/SetCustomLocation";
import Checkout1 from "./pages/OrderCheckout";
import Rewards from "./pages/Rewards";
import History from "./pages/OrderHistory";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

import { RestaurantProvider } from "./context/RestaurantContext";
import { OrderProvider } from "./context/OrderContext";

function App() {
  const location = useLocation();
  useEffect(() => {
    // scroll immediately to top when pathname changes
    window.scrollTo({ top: 0 });
    // Always clear any stale overflow-hidden left by modals/overlays
    // that didn't clean up before the route changed
    document.body.classList.remove("overflow-hidden");
    document.body.style.overflow = "";
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

  // Known paths that should show the sidebar
  const knownSidebarPaths = new Set([
    "/welcome",
    "/set-location",
    "/set-restaurant",
    "/set-custom-location",
    "/smart-assistant",
    "/virtual",
    "/recommend",
    "/recommended",
    "/step1",
    "/step2-budget",
    "/step3-party",
    "/step4-food-type",
    "/generating",
    "/FullMenu",
    "/OrderStatus",
    "/Checkout",
    "/rewards",
    "/history",
    "/admin",
    "/profile",
    "/help",
    "/locations",
    "/orderStatus",
  ]);

  const isExcluded =
    excludedPaths.has(path) || excludedPrefixes.some((p) => path.startsWith(p));
  const isKnownPage = knownSidebarPaths.has(path);
  const showSidebar = !isExcluded && isKnownPage;

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
    <RestaurantProvider>
      <OrderProvider>
        <div className="w-full min-h-screen" style={{ backgroundImage }}>
          {showSidebar && <Sidebar />}
          <div
            style={{
              willChange: "margin-left",
              transitionProperty: "margin-left",
              transitionDuration: "300ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className={`${
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
                path="/step2-budget"
                element={
                  <ProtectedRoute>
                    <Step2Budget />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/step3-party"
                element={
                  <ProtectedRoute>
                    <Step3Party />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/step4-food-type"
                element={
                  <ProtectedRoute>
                    <Step4FoodType />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/generating"
                element={
                  <ProtectedRoute>
                    <Generating />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
              <Route
                path="/recommended"
                element={
                  <ProtectedRoute>
                    <Recommended />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/smart-assistant"
                element={
                  <ProtectedRoute>
                    <SmartAssistant />
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
              <Route
                path="OrderStatus"
                element={
                  <ProtectedRoute>
                    <OrderStatus />
                  </ProtectedRoute>
                }
              />
              <Route
                path="Checkout"
                element={
                  <ProtectedRoute>
                    <Checkout1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="rewards"
                element={
                  <ProtectedRoute>
                    <Rewards />
                  </ProtectedRoute>
                }
              />
              <Route
                path="history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="help"
                element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </OrderProvider>
    </RestaurantProvider>
  );
}

export default App;
