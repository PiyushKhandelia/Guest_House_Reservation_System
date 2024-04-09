// Firebase configurations
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
firebase.initializeApp(firebaseConfig);

// Function to toggle password visibility
function togglePassword(id) {
    var x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function redirectToDashboard() {
    // Replace 'dashboard.html' with the URL of your dashboard page
    window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/adminPanel.html";
}

function validateAdmin(adminId, password) {
    var adminRef = firebase.database().ref('admins');
    var loginSuccessful = false; // Flag to track login status

adminRef.orderByChild('adminID').equalTo(adminId).once('value', function(snapshot) {
    if (snapshot.exists()) {
        snapshot.forEach(function(childSnapshot) {
            var adminData = childSnapshot.val();
            if (adminData.password === password) {
                loginSuccessful = true;
                // Redirect to dashboard upon successful login
                redirectToDashboard();
            }
        });

        if (!loginSuccessful) {
            // Password incorrect
            alert("Password Incorrect");
        }
    } else {
        // Admin ID not found
        alert("Admin ID not found");
    }
});
}

// Function to handle admin login form submission
document.addEventListener('DOMContentLoaded', function () {
const adminLoginForm = document.getElementById('login-btn');
adminLoginForm.addEventListener('click', function (e) {
    e.preventDefault();

    // Get admin ID and password from the form
    var adminId = document.getElementById("adminId").value.trim();
    var password = document.getElementById("password").value.trim();

    // Validate admin credentials
    validateAdmin(adminId, password);
});
});