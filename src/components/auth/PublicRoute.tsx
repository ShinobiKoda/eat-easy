import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import { ClipLoader } from "react-spinners";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
      setIsLoading(false);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
        setIsLoading(false);
      },
    );

    return () => {
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

  if (isAuthenticated) {
    return <Navigate to="/set-location" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
