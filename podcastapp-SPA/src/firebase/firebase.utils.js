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

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;