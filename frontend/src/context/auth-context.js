import { createContext } from "react";

export const AuthContext = createContext({
   isLoggedIn: false,
   isAdmin: false,
   username: "",
   id: "",
   token: null,
   login: () => {},
   logout: () => {},
});
