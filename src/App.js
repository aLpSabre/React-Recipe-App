
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { GlobalStyle } from "./components/GlobalStyle/GlobalStyle";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Survey from "./pages/Survey/Survey";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { RecipeDetail } from "./components/Recipes/RecipeDetail";
import SignIn from "./pages/Login/Signin";
import SignUp from "./pages/Login/Signup";
import { userObserver } from "./components/auth/firebase";


const App = () => {


  useEffect(() => {
    userObserver();


  }, [])

  return (

    <>

      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="survey" element={<Survey />} />
        <Route path="survey/:id" element={<RecipeDetail />} />
        <Route path="login" element={<SignIn />} />
        <Route path="login/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
