// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7V-foRGLw76jjKE64gQE-67SZT_Wdz3k",
    authDomain: "login-register-9b2b3.firebaseapp.com",
    projectId: "login-register-9b2b3",
    storageBucket: "login-register-9b2b3.appspot.com",
    messagingSenderId: "221629028785",
    appId: "1:221629028785:web:79d4ba5d8e8564d8bc0590"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth