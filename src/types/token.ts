export interface MyTokenPayload {
  UserId: string;
  Email: string;
  Name: string;
  Position: string;
  RoleId: string; // <-- string, not number
  exp: number;
  iat: number;
}
