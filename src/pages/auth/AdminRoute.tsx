import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { adminService } from "../../services/adminService";
import Loader from "../../components/Loader";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await adminService.isCurrentUserAdmin();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Admin verification failed:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) {
    return <Loader />;
  }

  // If not admin, redirect them to the home dashboard
  if (!isAdmin) {
    // You could optionally add a toast here saying "Unauthorized"
    return <Navigate to="/welcome" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
