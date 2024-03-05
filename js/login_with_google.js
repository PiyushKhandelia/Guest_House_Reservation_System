// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLHdQpcdEPBxHG8_pI49ctq7FfEDK9KmM",
    authDomain: "guesthousereservationsystem.firebaseapp.com",
    projectId: "guesthousereservationsystem",
    storageBucket: "guesthousereservationsystem.appspot.com",
    messagingSenderId: "324476262968",
    appId: "1:324476262968:web:887539776c70257702e4cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en'
const provider = new GoogleAuthProvider();

const Login = document.getElementById("login-btn");
Login.addEventListener("click", function (event) {
    event.preventDefault()
    
    //inputs
    const email = document.getElementById('loginemail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const email = userCredential.email;
            alert("LogIn Successful");
            window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/booking.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
})

const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            alert("Login Successful");
            window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/booking.html";
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
    });
})