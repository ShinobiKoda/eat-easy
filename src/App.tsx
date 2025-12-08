import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Splash from "./components/Splash";
import GetStarted from "./components/GetStarted";
import SignUpMethod from "./components/auth/SignUpMethod";
import Signup from "./components/auth/SignUp"
import Locations from "./components/Locations";
import SetLocation from "./components/SetLocation";
import Welcome from "./components/Welcome";
import Virtual from "./components/Virtual";
import Recommend from "./components/Recommend";
import Recommended from "./components/Recommended";
import Step1 from "./components/Step1";
import OrderStatus from "./components/OrderStatus";
import { useTheme } from "./hooks/useTheme";
import ThemeSwitchButton from "./components/ThemeSwitchButton";

function App() {
  const location = useLocation();
  useEffect(() => {
    // scroll immediately to top when pathname changes
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const { theme } = useTheme();

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <div className="w-full min-h-screen" style={{ backgroundImage }}>
      <div className="absolute top-6 right-6 z-50">
        <ThemeSwitchButton />
      </div>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/method" element={<SignUpMethod />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/setlocation" element={<SetLocation />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/virtual" element={<Virtual />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/orderStatus" element={<OrderStatus />} />
        <Route path="*" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
