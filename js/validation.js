function togglePassword(inputId) {
    var x = document.getElementById(inputId);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

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
        // Password validation
        if (!validatePassword(password)) {
            alert('Password must be between 8 and 16 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
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

    // Password validation function
    function validatePassword(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+={[}\]|:;"'<,>.?\/]).{8,16}$/;
        return regex.test(password);
    }

    // Adding event listeners for form submission
    document.querySelector('.signup-box .clkbtn').addEventListener('click', function() {
        if (validateSignup()) {
            // Perform signup action here
            //alert('Signup successful!');
        }
    });
});