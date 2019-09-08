import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyAFCEPW-FXmw_DAZXvGgE5FnNcQZBiww1s",
  authDomain: "nawst-zencast.firebaseapp.com",
  databaseURL: "https://nawst-zencast.firebaseio.com",
  projectId: "nawst-zencast",
  storageBucket: "",
  messagingSenderId: "147709201954",
  appId: "1:147709201954:web:b17cf293aa15ddb1"
};

// imported in App.js - componentDidMount -> auth.onAuthStateChanged
export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;

  // get reference/snapshot of user document from firestore database
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  // if user doesn't already exist in firestore db, add them/create snapshot
  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        photoURL,
        ...additonalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>  auth.signInWithPopup(provider);

export default firebase;
