import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, setDoc, doc, getDoc } from "firebase/firestore";

//* Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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