import { createContext } from "react";

export const KeyContext = createContext({
   KeypairID: "",
   Name: "",
   Type: "",
   Length: "",
   PublicKey: "",
   PrivateKey: "",
   UserID: "",
});
