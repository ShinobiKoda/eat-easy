import { useEffect, useState, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { ClipLoader } from "react-spinners";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (isMounted.current) {
        setIsAuthenticated(!!data.session);
        setIsLoading(false);
      }
    };
    checkAuth();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted.current) {
          setIsAuthenticated(!!session);
          setIsLoading(false);
        }
      },
    );
    return () => {
      isMounted.current = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <ClipLoader color="var(--purple-2)" size={40} />
      </div>
    );
  }

  // Only redirect if loading is false and not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
