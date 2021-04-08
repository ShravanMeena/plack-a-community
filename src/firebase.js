import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAuDs69S_fxyEg_KeWUXiXx8Zn-elO6U-4",
  authDomain: "slack0799.firebaseapp.com",
  projectId: "slack0799",
  storageBucket: "slack0799.appspot.com",
  messagingSenderId: "611965667224",
  appId: "1:611965667224:web:2b0895da5d7a8e749d4ded",
  measurementId: "G-8W8Z9PXVJP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
