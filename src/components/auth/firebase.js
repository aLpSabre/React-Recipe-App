// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";


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
export const signup = async (email, password, displayName) => {

  try {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredentials.user)
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  }

}

//? Sign-In
export const signIn = async (email, password) => {

  try {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredentials.user)

  }
  catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  }

}

export const userObserver = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      const uid = user.uid;
      console.log(user)
      console.log(uid)
      // ...
    } else {
     
    }
  });
}

