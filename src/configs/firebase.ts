import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK4PRyNK8xv2J6pkh37N1WKvGz8uSw7iY",
  authDomain: "vibesnap-eb899.firebaseapp.com",
  projectId: "vibesnap-eb899",
  storageBucket: "vibesnap-eb899.firebasestorage.app",
  messagingSenderId: "27896288208",
  appId: "1:27896288208:web:7086a8e168e393ac849fd5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

// firestore
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
