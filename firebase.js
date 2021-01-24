// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAtvLnxyIuc1e5GmH2SnBSUSTbwhHjWPzU",
    authDomain: "whatsapp-clone-52e49.firebaseapp.com",
    projectId: "whatsapp-clone-52e49",
    storageBucket: "whatsapp-clone-52e49.appspot.com",
    messagingSenderId: "13400902342",
    appId: "1:13400902342:web:027c53ffccfb664d3c25c7",
    measurementId: "G-T0S9W9HEQ7"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth= firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;