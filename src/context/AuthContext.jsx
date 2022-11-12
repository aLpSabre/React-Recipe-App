import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userObserver } from "../auth/firebase";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState("");
  const [loading, setLoading] = useState(true);

/* console.log(currentUser);
 */  useEffect(() => {
    userObserver(setUser,setLoading);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser,loading }}>{children}</AuthContext.Provider>
  );
};
