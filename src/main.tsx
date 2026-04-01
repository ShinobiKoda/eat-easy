import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";
import "react-phone-number-input/style.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <LocationProvider>
              <App />
            </LocationProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
