import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGm_kwVMTL8G5ouzaE3ZvR0Uha8E_NS-g",
  authDomain: "barbearia-pocam.firebaseapp.com",
  projectId: "barbearia-pocam",
  storageBucket: "barbearia-pocam.firebasestorage.app",
  messagingSenderId: "1067636686295",
  appId: "1:1067636686295:web:660f59363df95f97575f92",
  measurementId: "G-VP93HFQ85Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
