import type { MyTokenPayload } from "@/types/token";
import { jwtDecode } from "jwt-decode";

export function getJwtRoleId(): string {
  const token = localStorage.getItem("authToken");
  if (!token) return "0";

  try {
    const decodedToken = jwtDecode<MyTokenPayload>(token);
    return decodedToken?.RoleId ?? "0";
  } catch (err) {
    console.error("Invalid token:", err);
    return "0";
  }
}
