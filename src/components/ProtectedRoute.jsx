import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"

export const ProtectedRoute = ({element})=>{
    const {isAuthenticated} = useAuth();
    return isAuthenticated? element : <Navigate to="/login"/>;
}