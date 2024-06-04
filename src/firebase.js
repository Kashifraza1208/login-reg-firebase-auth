import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVY2VLn39WIBW7Kx-FQOetq9y0jX9Vym4",
  authDomain: "login-reg-auth.firebaseapp.com",
  projectId: "login-reg-auth",
  storageBucket: "login-reg-auth.appspot.com",
  messagingSenderId: "430213100605",
  appId: "1:430213100605:web:dfa0edbce04b9f2042e654",
  measurementId: "G-ZCBKFB65TN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, analytics, db };

export default app;
