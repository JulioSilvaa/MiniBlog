import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD44LS3T40x04UrK5GlL1xVtOhZXhHo-zs",
  authDomain: "myblog-3ca11.firebaseapp.com",
  projectId: "myblog-3ca11",
  storageBucket: "myblog-3ca11.appspot.com",
  messagingSenderId: "449613052188",
  appId: "1:449613052188:web:da3acb8100b897a42a22d9",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}