// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import {getFirestore, collection, getDocs, doc, updateDoc, deleteDoc} from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyBwS3EU9-lNpTCBrPSP0psKvVW987H-yrs",
  authDomain: "community-portal-mern.firebaseapp.com",
  projectId: "community-portal-mern",
  storageBucket: "community-portal-mern.appspot.com",
  messagingSenderId: "529163848385",
  appId: "1:529163848385:web:b7264e39f8a9e335d6e240",
  measurementId: "G-B0YH6CTC4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const DB = getFirestore();
export { auth, provider, DB};

export const getUsers = async () => {
  const usersCollection = collection(DB, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const users = usersSnapshot.docs.map((doc) => ({ userUid: doc.id, ...doc.data() }));
  return users;
};

export const updateUser = async (userUid, newData) => {
  const userDoc = doc(DB, "users", userUid);
  await updateDoc(userDoc, newData);
};

export const deleteUser = async (userUid) => {
  const userDoc = doc(DB, "users", userUid);
  await deleteDoc(userDoc);
};

//const analytics = getAnalytics(app);