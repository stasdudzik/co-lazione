import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBbzhr0hP5mZfIdYSfG1A0g5hRwA58uoZw",
  authDomain: "colazione-74dd1.firebaseapp.com",
  databaseURL: "https://colazione-74dd1.firebaseio.com",
  projectId: "colazione-74dd1",
  storageBucket: "colazione-74dd1.appspot.com",
  messagingSenderId: "404896868167",
  appId: "1:404896868167:web:b0348dbe16834fd1580e62",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
