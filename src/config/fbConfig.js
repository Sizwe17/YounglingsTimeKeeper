
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDcMpYp5lHWGPV2JVVwhqE9GcOi5FryzUk",
    authDomain: "fir-react-auth-38112.firebaseapp.com",
    databaseURL: "https://fir-react-auth-38112.firebaseio.com",
    projectId: "fir-react-auth-38112",
    storageBucket: "fir-react-auth-38112.appspot.com",
    messagingSenderId: "953111605124",
    appId: "1:953111605124:web:408ec629ec35266b8bb7d1",
    measurementId: "G-NEMC3669LZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;