import { Navigate } from "react-router-dom";
import { Context } from "./authContext";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

function UserAuthGuard({ children }) {
  const { user } = useContext(Context);
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view this page");
    }
  }, [user]);
  if (!user) {
    return <Navigate to="/auth" />;
  } else return children;
}
export default UserAuthGuard;
