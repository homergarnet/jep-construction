// useScreenSize.js
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import useLoginContext from "@/store/login/useLoginContext";
import { isAuthenticated } from "@/utils/tokenhelpers";
import { getJwtRoleId } from "@/utils/getJwtRoleId";
import { ADMIN_ROLE_ID, CLIENT_ROLE_ID } from "@/constants/constants";

const useRedirect = () => {

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        const isTokenExpired =
          decodedToken &&
          decodedToken.exp !== undefined &&
          decodedToken.exp * 1000 < Date.now();

        if (!isTokenExpired) {
          const roleId = getJwtRoleId();
          //redirect to order-analyst/home if authenticated else, to the login page
          const redirectUrl =
            location?.state?.prevUrl || isAuthenticated()
              ? roleId === ADMIN_ROLE_ID ? "/admin/employee-list" : roleId === CLIENT_ROLE_ID ? "/employee/in-out" : "/client/my-projects"
              : !isAuthenticated() ? "/" : "/unauthorized";
          navigate(redirectUrl);
        }
      } catch (err: unknown) {
        console.error("Invalid token:", err);
      }
    }
  }, [navigate, location]);
};

export default useRedirect;
