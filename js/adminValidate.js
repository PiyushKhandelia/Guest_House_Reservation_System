function togglePassword(inputId) {
    var x = document.getElementById(inputId);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    function validateLogin() {
        var adminid = document.querySelector('.login-box .adminid').value;
        var password = document.querySelector('.login-box .password').value;

        // Basic validation example (you can extend it as needed)
        if (adminid.trim() === '') {
            alert('Please Enter your ID:');
            return false;
        }
        if (password.trim() === '') {
            alert('Please enter your password');
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

    // Password validation function
    function validatePassword(password) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_\-\+={[}\]|:;"'<,>.?\/]).{8,16}$/;
        return regex.test(password);
    }

    // Adding event listeners for form submission
    document.querySelector('.login-box .clkbtn').addEventListener('click', function() {
        if (validateLogin()) {
            // Perform signup action here
            //alert('Signup successful!');
        }
    });
});