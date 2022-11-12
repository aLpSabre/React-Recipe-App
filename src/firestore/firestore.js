// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, getDocs, setDoc, doc, getDocFromCache, getDoc } from "firebase/firestore";

/* const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore"); */

//* Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4uMekdRglkPGq10476LJHEbfKTBpEVdU",
  authDomain: "the-worlds-food-7f8ad.firebaseapp.com",
  projectId: "the-worlds-food-7f8ad",
  storageBucket: "the-worlds-food-7f8ad.appspot.com",
  messagingSenderId: "110420626521",
  appId: "1:110420626521:web:9eba47dae3c4dc19e5b548"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



export const addData = async () => {
  try {
    const docRef = await addDoc(collection(db, "test"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
      object: { "ali": 1 },
      id: 1222
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const readData = async (userId, setData) => {
  console.log("readDATA");
  const querySnapshot = await getDocs(collection(db, userId));
  /*   querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
  
    }); */

  const array = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  console.log(array)
  console.log(array[0].data);

  setData(array[0].data);
  /*   console.log(querySnapshot); */
}

export const setDataFire = async (userId, type, data) => {
 /*  console.log("setData"); */

  await setDoc(doc(db, userId, type), data);
}

//TODO 
export const getDataFire = async (userId, type, set,get) => {
  /*  const docRef = doc(db, "cities", "SF"); */
  const docRef = doc(db, userId, type);
  const docSnap = await getDoc(docRef);
let count=0;
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data()[type]);
    set(docSnap.data()[type])
  } else {
    // doc.data() will be undefined in this case

    console.log("No such document!");
    count<1 && get({ q: "chicken" })
    count++;

  }
}