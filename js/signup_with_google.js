        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
        import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
            authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
            databaseURL: "https://guesthousebookingsystem-675c6-default-rtdb.firebaseio.com",
            projectId: "guesthousebookingsystem-675c6",
            storageBucket: "guesthousebookingsystem-675c6.appspot.com",
            messagingSenderId: "979837493640",
            appId: "1:979837493640:web:64745b6eefd825d4c31a3d"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        auth.languageCode = 'en';
        const googleProvider = new GoogleAuthProvider();

        // email/Password Sign-up
        const emailSignUp = document.getElementById("google-signup-btn");
        emailSignUp.addEventListener("click", function (event) {
            event.preventDefault()
            alert("Pleast wait for some time. It may take upto 1 minutes.");
            //inputs
            const email = document.getElementById('signupemail').value;
            const password = document.getElementById('signupPassword').value;
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const email = userCredential.user;
                    console.log("username: " + email + "& password: " + password);
                    alert("SignUp Successful");
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        });