// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
  authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
  projectId: "guesthousebookingsystem-675c6",
  storageBucket: "guesthousebookingsystem-675c6.appspot.com",
  messagingSenderId: "979837493640",
  appId: "1:979837493640:web:56a264b9fc7e8d94c31a3d"
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