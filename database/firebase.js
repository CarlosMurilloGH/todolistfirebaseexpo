import firebase from "firebase";

import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyD1fBVG34IyJrkfCPRc4RoyM5HZncbrNsE",
    authDomain: "todolistcrudnative.firebaseapp.com",
    projectId: "todolistcrudnative",
    storageBucket: "todolistcrudnative.appspot.com",
    messagingSenderId: "479158805766",
    appId: "1:479158805766:web:69d9ab61cb6aadee632a87"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db= firebase.firestore();

  export default{
      firebase,
      db,
  };