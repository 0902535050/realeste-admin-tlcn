import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyAASC5uW_3ksi891Q2an8JJprwVWghuJ8g",
    authDomain: "realstate-7744f.firebaseapp.com",
    databaseURL: "https://realstate-7744f.firebaseio.com",
    projectId: "realstate-7744f",
    storageBucket: "realstate-7744f.appspot.com",
    messagingSenderId: "659880246456"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
