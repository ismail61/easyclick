import { Auth } from "adapters/auth/auth";

export function Authenticate(user){
  return Auth(user);
}