        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
        import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

        // username/Password Sign-up
        const usernameSignUp = document.getElementById("google-signup-btn");
        usernameSignUp.addEventListener("click", function (event) {
            event.preventDefault()
            alert("Pleast wait for some time. It may take upto 1 minutes.");
            //inputs
            const username = document.getElementById('signupusername').value;
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