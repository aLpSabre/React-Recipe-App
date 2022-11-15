import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userObserver } from "../auth/firebase";
import { getDataFire, setDataFire } from "../firestore/firestore";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    userObserver(setUser, setLoading,setSavedRecipes);
  }, []);
  useEffect(() => {
    if (currentUser) {
      getDataFire(currentUser.uid, "savedRecipes", setSavedRecipes);
    }
  }, [currentUser]);

  useEffect(() => {
    currentUser &&
      setDataFire(currentUser.uid, "savedRecipes", {
        savedRecipes: savedRecipes,
      });
  }, [savedRecipes]);
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        setLoading,
        savedRecipes,
        setSavedRecipes,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
