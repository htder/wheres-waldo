import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAJi7NUzN8Kp9H9KDfXpVr1NqVhyFXZvOc",
  authDomain: "wheres-waldo-react.firebaseapp.com",
  projectId: "wheres-waldo-react",
  storageBucket: "wheres-waldo-react.appspot.com",
  messagingSenderId: "985883570026",
  appId: "1:985883570026:web:6a637e9392d5aae9e43f13",
  measurementId: "G-CX1MKPG1MN"
};

firebase.initializeApp(firebaseConfig);
export { firebase };
