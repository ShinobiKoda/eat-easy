import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import PublicRoute from "./pages/auth/PublicRoute";
import AdminRoute from "./pages/auth/AdminRoute";
import Loader from "./components/Loader";
import OrderReadyToast from "./components/OrderReadyToast";
import OrderBatchMonitor from "./components/OrderBatchMonitor";

import { RestaurantProvider } from "./context/RestaurantContext";
import { OrderProvider } from "./context/OrderContext";

// Lazy-loaded components
import Splash from "./pages/Splash";
const GetStarted = lazy(() => import("./pages/GetStarted"));
const SignUpMethod = lazy(() => import("./pages/auth/SignUpMethod"));
const Signup = lazy(() => import("./pages/auth/SignUp"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Welcome = lazy(() => import("./pages/Welcome"));
const Virtual = lazy(() => import("./pages/VirtualAssistant/VirtualAssitantHomepage"));
const Recommend = lazy(() => import("./components/AI-Assistant/Recommend"));
const Recommended = lazy(() => import("./pages/VirtualAssistant/ShowVirtualAssistantRecommendations"));
const SmartAssistant = lazy(() => import("./pages/VirtualAssistant/VirtualAssistantWelcomeBackPage"));
const FullMenu = lazy(() => import("./pages/FullMenu"));
const OrderStatus = lazy(() => import("./pages/OrderStatus"));
const Step1 = lazy(() => import("./pages/VirtualAssistant/ChooseFeeling"));
const Step2Budget = lazy(() => import("./pages/VirtualAssistant/ChooseBudget"));
const Step3Party = lazy(() => import("./pages/VirtualAssistant/ChoosePopulation"));
const Step4FoodType = lazy(() => import("./pages/VirtualAssistant/ChooseFoodType"));
const Generating = lazy(() => import("./pages/VirtualAssistant/GenerateAIRecommendations"));
const ConfirmLink = lazy(() => import("./pages/auth/ConfirmLink"));
const ResetEmailSent = lazy(() => import("./pages/auth/ResetEmailSent"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));
const SetLocation = lazy(() => import("./pages/SetLocation"));
const SelectRestaurant = lazy(() => import("./pages/SelectRestaurant"));
const SetCustomLocation = lazy(() => import("./pages/SetCustomLocation"));
const Checkout1 = lazy(() => import("./pages/OrderCheckout"));
const Rewards = lazy(() => import("./pages/Rewards"));
const History = lazy(() => import("./pages/OrderHistory"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Help = lazy(() => import("./pages/Help"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });

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
          <OrderBatchMonitor />
          <OrderReadyToast />
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
            <Suspense fallback={<Loader />}>
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
          </Suspense>
          </div>
        </div>
      </OrderProvider>
    </RestaurantProvider>
  );
}

export default App;
