import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  id: null,
  token: null,
  login: () => {},
  logout: () => {},
});
