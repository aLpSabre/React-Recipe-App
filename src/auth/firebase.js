// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";



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
export const signup = async (email, password, displayName,navigate) => {

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredentials.user)
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/myaccount");
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  }

}

//? Sign-In
export const signIn = async (email, password, navigate) => {

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredentials.user)
    navigate("/myaccount/personalInfo");

  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  }

}

export const userObserver = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      console.log(user)
      const { email, displayName, photoURL } = user;
      setUser({ email, displayName, photoURL })
      console.log(uid)
      console.log(user);
      // ...
    } else {
      setUser("")
    }
  });
}

export const logOut = (navigate) => {
  signOut(auth);
  console.log("sign out");
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
      navigate("/myaccount/personalInfo");
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}

export const forgotPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log("email sent");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}