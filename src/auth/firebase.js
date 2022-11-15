// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//* Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4uMekdRglkPGq10476LJHEbfKTBpEVdU",
  authDomain: "the-worlds-food-7f8ad.firebaseapp.com",
  projectId: "the-worlds-food-7f8ad",
  storageBucket: "the-worlds-food-7f8ad.appspot.com",
  messagingSenderId: "110420626521",
  appId: "1:110420626521:web:9eba47dae3c4dc19e5b548"
};

//* Initialize Firebase
export const app = initializeApp(firebaseConfig);

//*  Initialize Firebase Authentication and get a reference to the service*///
const auth = getAuth(app);

//? Sign-Up
export const signup = async (email, password, displayName, navigate) => {

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/survey");

  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorCode === "auth/invalid-email" ? "Please enter an valid E-Mail!" : errorCode === "auth/invalid-email" ? `${errorMessage.slice(10, errorMessage.length - 22)} !` : errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

}

//? Sign-In
export const signIn = async (email, password, navigate) => {

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log("sign in")
    navigate("/survey");

  }
  catch (error) {


    const errorMessage = error.message;

    const errorCode = error.code;

    toast.error(errorCode === "auth/invalid-email" ? "Please enter an valid E-Mail!" : errorCode === "auth/invalid-email" ? `${errorMessage.slice(10, errorMessage.length - 22)} !` : errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

}

export const userObserver = (setUser, setLoading, setSavedRecipes) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const { email, displayName, photoURL, uid } = user;
      setUser({ email, displayName, photoURL, uid })
      setTimeout(() => setLoading(false), 1000)

    } else {
      setUser("")
      setSavedRecipes([])
      setTimeout(() => setLoading(false), 1000)


    }
  });
}

export const logOut = (navigate) => {
  signOut(auth);

  navigate("/login")

}
export const googleAuth = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      navigate("/survey");
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;

      toast.error(errorCode === "auth/invalid-email" ? "Please enter an valid E-Mail!" : errorCode === "auth/invalid-email" ? `${errorMessage.slice(10, errorMessage.length - 22)} !` : errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    });

}

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("E-Mail is sent!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error("Please enter an valid E-Mail!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // ..
    });
}

export const updateUser = async (displayName) => {
  await updateProfile(auth.currentUser, {
    displayName: displayName,
  });
}