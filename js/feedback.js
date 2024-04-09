// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
    authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
    databaseURL: "https://guesthousebookingsystem-675c6-default-rtdb.firebaseio.com",
    projectId: "guesthousebookingsystem-675c6",
    storageBucket: "guesthousebookingsystem-675c6.appspot.com",
    messagingSenderId: "979837493640",
    appId: "1:979837493640:web:64745b6eefd825d4c31a3d"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Function to validate email
function validateEmail(email) {
    // Regular expression for email validation
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Function to validate mobile number
function validateMobile(mobile) {
    // Regular expression for mobile number validation
    var re = /^\d{10}$/;
    return re.test(mobile);
}

// Function to store feedback in Firebase database
document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var fullName = document.getElementById('fullName').value.trim();
    var email = document.getElementById('email').value.trim();
    var mobile = document.getElementById('mobile').value.trim();
    var message = document.getElementById('msg').value.trim();

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validateMobile(mobile)) {
        alert('Please enter a valid 10-digit mobile number.');
        return;
    }

    if (fullName === '' || message === '') {
        alert('Please provide all mandatory details.');
        return;
    }

    // Store feedback in Firebase database
    firebase.database().ref('feedback/' + mobile).set({
        fullName: fullName,
        email: email,
        mobile: mobile,
        message: message
    }).then(function () {
        alert('Feedback submitted successfully.');
        // Clear form fields after successful submission
        document.getElementById('fullName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('msg').value = '';
    }).catch(function (error) {
        console.error('Error submitting feedback: ', error);
        alert('An error occurred while submitting feedback: ' + error.message);
    });
});