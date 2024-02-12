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
    document.querySelector('.login-box .clkbtn').addEventListener('click', function() {
        if (validateLogin()) {
            // Perform login action here
            alert('Login successful!');
        }
    });

    document.querySelector('.signup-box .clkbtn').addEventListener('click', function() {
        if (validateSignup()) {
            // Perform signup action here
            alert('Signup successful!');
        }
    });
});