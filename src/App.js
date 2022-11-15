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
import { useAuthContext } from "./context/AuthContext";
import ForgotPassword from "./pages/Login/ForgotPassword";
import { MyAccount } from "./pages/MyAccount/MyAccount";

import { PersonalInfo } from "./components/PersonalInfo/PersonalInfo";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { SavedRecipes } from "./components/SavedRecipes/SavedRecipes";

import { GridLoader } from "react-spinners";
import { NotFound } from "./components/404/NotFound";
import { ToastContainer } from "react-toastify";
import { MealPlanner } from "./pages/MealPlanner";


const App = () => {
  const { loading } = useAuthContext();


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
          <Route path="mealPlanner" element={<MealPlanner />} />
          <Route path="myaccount" element={<MyAccount />}>
            <Route path="personalInfo" element={<PersonalInfo />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="savedRecipes" element={<SavedRecipes />} />
            <Route path="savedRecipes/:id" element={<RecipeDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="" element={<ToastContainer />} />

        </Routes></>
      }




    </>
  );
}

export default App;
