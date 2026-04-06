import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../config/supabaseClient";
import Loader from "../../components/Loader";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      setAuthenticated(!!data?.user);
      setLoading(false);
    };

    checkAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthenticated(!!session);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (authenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
