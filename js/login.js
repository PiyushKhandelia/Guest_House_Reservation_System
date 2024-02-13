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

});