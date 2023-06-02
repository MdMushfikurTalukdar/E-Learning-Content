import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
const RequireAuth = ({ children }) => {
  const location = useLocation();
  
  if (!Cookies.get("token")) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;
