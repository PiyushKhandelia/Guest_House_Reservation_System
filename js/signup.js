document.addEventListener("DOMContentLoaded", function() {
    //Declaring Global Variables
    const usersA = [];
    const passA = [];
    //Local Variable
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

    function validateLogin() {
        var email = document.querySelector('.login-box .email').value;
        var password = document.querySelector('.login-box .password').value;
        // Basic validation example (you can extend it as needed)
        if (email.trim() === '') {
            alert('Please enter your email');
            return false;
        }
        if (password.trim() === '') {
            alert('Please enter your password');
            return false;
        }
        // If validation passes, return true
        return true;
    }

    function validateSignup() {
        var name = document.querySelector('.signup-box .name').value;
        var emails = document.querySelector('.signup-box .email').value;
        var passwords = document.querySelector('.signup-box .password').value;
        var confirmPassword = document.querySelectorAll('.signup-box .passwords')[1].value;
        // Basic validation example (you can extend it as needed)
        if (name.trim() === '') {
            alert('Please enter your name');
            return false;
        }
        if (emails.trim() === '') {
            alert('Please enter your email');
            return false;
        }
        // Email validation
        if (!isValidEmail(emails)) {
            alert('Please enter a valid email address');
            return false;
        }
        if (passwords.trim() === '') {
            alert('Please enter your password');
            return false;
        }
        if (passwords !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        // If validation passes, return true
        return true;
    }

    // Email validation function
    function isValidEmail(emails) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emails);
    }

    // Adding event listeners for form submission
    document.querySelector('.login-box .clkbtn').addEventListener('click', function() {
        if (validateLogin()) {
            // Perform login action here
            //Fetching & Saving data at javascript
            if (usersA == emails) {
                if(passA == passwords) {
                    alert('Login Successful');
                }
                else {
                    alert('Password Mismatch');
                }
            }
            else {
                
                alert('Login Fail');
            }
        }
    });

    document.querySelector('.signup-box .clkbtn').addEventListener('click', function() {
        if (validateSignup()) {
            // Perform signup action here
            //Fetching & Saving data at javascript
            usersA = " " .concat(emails = document.querySelector('.signup-box .email').value);
            passA = " " .concat(passwords = document.querySelector('.signup-box .password').value);
            login.addEventListener("click", () => {
                slider.classList.remove("moveslider");
                formSection.classList.remove("form-section-move");
            });
            alert('Sign-In Successful');
        }
    });
});