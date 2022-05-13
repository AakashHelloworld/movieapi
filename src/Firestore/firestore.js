import { getFirestore, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDTbxgaDiW9krkrJha-Zz1pGWkHqr7ClQ8",
  authDomain: "fir-learning-bff74.firebaseapp.com",
  projectId: "fir-learning-bff74",
  storageBucket: "fir-learning-bff74.appspot.com",
  messagingSenderId: "326653008218",
  appId: "1:326653008218:web:cceaa350224c13b7417b63",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
