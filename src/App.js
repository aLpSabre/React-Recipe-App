
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalStyle } from "./components/GlobalStyle/GlobalStyle";
import {
  Routes,
  Route,
} from "react-router-dom";
import Survey from "./pages/Survey/Survey";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { RecipeDetail } from "./components/Recipes/RecipeDetail";
import SignIn from "./pages/Login/Signin";
import SignUp from "./pages/Login/Signup";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import ForgotPassword from "./pages/Login/ForgotPassword";
import { MyAccount } from "./pages/MyAccount/MyAccount";
import { MyRecipes } from "./pages/MyRecipes/MyRecipes";
import { PersonalInfo } from "./components/PersonalInfo/PersonalInfo";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { SavedRecipes } from "./components/SavedRecipes/SavedRecipes";
import { addData, read, readData, setData } from "./firestore/firestore";
import { GridLoader } from "react-spinners";
import { NotFound } from "./components/404/NotFound";


const App = () => {
  const { loading } = useAuthContext();

  /* console.log(loading,"loading") */


  useEffect(() => {
    /*   addData();
      readData(); */
    /*   setData(currentUser.uid,"input"); */
    /* console.log("did mount") */

  }, [])
  const loadingStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  }

  return (
    <>

      <GlobalStyle />
      {loading ? (
        <GridLoader color={"#FC6011"} size={30} style={loadingStyle} speedMultiplier={1} />

      ) : <><Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="survey" element={<Survey />} />
          <Route path="survey/:id" element={<RecipeDetail />} />
          <Route path="login" element={<SignIn />} />
          <Route path="login/signup" element={<SignUp />} />
          <Route path="login/forgotPassword" element={<ForgotPassword />} />
          <Route path="myaccount" element={<MyAccount />}>
            <Route path="personalInfo" element={<PersonalInfo />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="savedRecipes" element={<SavedRecipes />} />
            <Route path="savedRecipes/:id" element={<RecipeDetail />} />
          </Route>
        
          <Route path="myrecipes" element={<MyRecipes />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes></>
      }




    </>
  );
}

export default App;
