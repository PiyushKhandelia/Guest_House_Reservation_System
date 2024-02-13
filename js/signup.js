document.addEventListener("DOMContentLoaded", function() {
    let signup = document.querySelector(".signup");
    let login = document.querySelector(".login");
    let slider = document.querySelector(".slider");
    let formSection = document.querySelector(".form-section");

    signup.addEventListener("click", () => {
        slider.classList.add("moveslider");
        formSection.classList.add("form-section-move");
    });

    login.addEventListener("click", () => {
        slider.classList.remove("moveslider");
        formSection.classList.remove("form-section-move");
    });

    function validateSignup() {
        var name = document.querySelector('.signup-box .name').value;
        var email = document.querySelector('.signup-box .email').value;
        var password = document.querySelector('.signup-box .password').value;
        var confirmPassword = document.querySelectorAll('.signup-box .password')[1].value;
        // Basic validation example (you can extend it as needed)
        if (name.trim() === '') {
            alert('Please enter your name');
            return false;
        }
        if (email.trim() === '') {
            alert('Please enter your email');
            return false;
        }
        // Email validation
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        if (password.trim() === '') {
            alert('Please enter your password');
            return false;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        // If validation passes, return true
        return true;
    }

    // Email validation function
    function isValidEmail(email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Adding event listeners for form submission

    document.querySelector('.signup-box .clkbtn').addEventListener('click', function() {
        if (validateSignup()) {
            // Your web app's Firebase configuration
            const firebaseConfig = {
                apiKey: "AIzaSyACLgTzxec6kUV1T__xQsOk_sL3SSbW81U",
                authDomain: "guest-house-booking-4e024.firebaseapp.com",
                databaseURl: "https://guest-house-booking-4e024-default-rtdb.firebaseio.com/",
                projectId: "guest-house-booking-4e024",
                storageBucket: "guest-house-booking-4e024.appspot.com",
                messagingSenderId: "613303744507",
                appId: "1:613303744507:web:5bb7c28f6bf02947e8bd5e"
            };

            //initalize firebase
            firebase.initializeApp(firebaseConfig);
            
            //reference your database
            var guesthousebookingDB = firebase.database().ref('guest-house-booking');

            document.getElementById('signup-box').addEventListener("submit", submitform);

            function submitform(e) {
                e.preventDefault();

                var name = getElementVal('name');
                var users = getElementVal('uname');
                var passwords = getElementVal('pass');

                console.log(name, users, passwords);
            }

            const getElementVal = (id) => {
                return document.getElementById(id).value;
            }
            // Perform signup action here
            alert('Signup successful!');
        }
    });
});