import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import required methods

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

const db = getFirestore(app);
const storage = getStorage(app);

export const uploadFileToStorage = async (file: File) => {
  const storageRef = ref(storage, `images/${file.name}`); // Corrected the usage of `storage`
  const uploadTask = uploadBytes(storageRef, file); // Use `uploadBytes` instead of `put` for newer SDK

  return new Promise<string>((resolve, reject) => {
    uploadTask
      .then(() => {
        getDownloadURL(storageRef).then(resolve).catch(reject);
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
