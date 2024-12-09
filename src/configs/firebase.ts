import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required methods

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

const db = getFirestore(app);
const storage = getStorage(app);

export const filesRef = ref(storage, "files");

export const userCollectionref = collection(db, "users");
export const mediaCollectionref = collection(db, "media");
export const postsCollectionref = collection(db, "posts");

export const uploadFileToStorage = async (file: File) => {
  const uploadTask = uploadBytes(filesRef, file);

  return new Promise<string>((resolve, reject) => {
    uploadTask
      .then(() => {
        getDownloadURL(filesRef).then(resolve).catch(reject);
      })
      .catch(reject);
  });
};

// Save data to Firestore
export const saveDataToFirestore = async (data: { text: string; fileUrl: string }) => {
  const docRef = doc(db, "posts", "new-post-id"); // Create a new document with a custom ID or generate one
  await setDoc(docRef, {
    text: data.text,
    imageUrl: data.fileUrl,
    likes: 0,
    timestamp: new Date(), // Optionally, add a timestamp field
  });
};

export { auth, db, storage };
