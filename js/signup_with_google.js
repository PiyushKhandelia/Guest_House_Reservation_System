import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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
auth.languageCode = 'en';
const googleProvider = new GoogleAuthProvider();

// Google Sign-in
const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function() {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log(user);
            alert("Login Successful");
            window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/booking.html";
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Email/Password Sign-up
const emailSignUp = document.getElementById("google-signup-btn");
emailSignUp.addEventListener("click", function (event) {
    event.preventDefault()
    alert("Pleast wait for some time. It may take upto 1 minutes.");
    //inputs
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("SignUp Successful");
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});