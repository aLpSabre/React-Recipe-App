import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, setDoc, doc, getDoc } from "firebase/firestore";

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

export const readData = async (userId, setData) => {

  const querySnapshot = await getDocs(collection(db, userId));

  const array = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

  setData(array[0].data);
}

export const setDataFire = async (userId, type, data) => {

  await setDoc(doc(db, userId, type), data);
}

//TODO 
export const getDataFire = async (userId, type, set, get) => {

  const docRef = doc(db, userId, type);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
   
    set(docSnap.data()[type])

  } else {
    type === "data" && get({ q: "chicken" })
  }
}