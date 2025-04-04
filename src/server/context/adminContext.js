import { Navigate } from "react-router-dom";
import { Context } from "./authContext";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

function AdminAuthGuard({ children }) {
  const { user } = useContext(Context);
  useEffect(() => {
    if (user && user.userRole !== "admin") {
      toast.error("You are not authorized to view this page");
    }
  }, [user]);

  if (user && user.userRole === "admin") return children;
  else {
    return <Navigate to="/" />;
  }
}
export default AdminAuthGuard;
