import Layout from "@/layout/Layout";
import useLoginContext from "@/store/login/useLoginContext";
import type { MyTokenPayload } from "@/types/token";
import { isAuthenticated } from "@/utils/tokenhelpers";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    roles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {

    const location = useLocation();
    const token = localStorage.getItem("authToken");
    // default roleId to "0" if no token
    let roleId = "0";

    if (token) {
        try {
            const decodedToken = jwtDecode<MyTokenPayload>(token);
            roleId = decodedToken?.RoleId ?? "0";
        } catch (err) {
            console.error("Invalid token:", err);
            roleId = "0";
        }
    }
    if (!isAuthenticated()) {
        return <Navigate to="/" state={{ prevUrl: location.pathname }} />;
    }

    if (!roleId || roleId === "0") {
        return <Navigate to="/unauthorized" />;
    }

    if (roles.includes(parseInt(roleId))) {
        return <Layout />;
    }

    return <Navigate to="/unauthorized" />;

};

export default ProtectedRoute;