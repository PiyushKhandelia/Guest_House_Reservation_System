// Function to show Manage Admin section and hide Add Admin section
function showManageAdmin() {
    document.getElementById('manageAdmin_form').style.display = 'block';
    document.getElementById('addAdmin_form').style.display = 'none';
}

// Function to show Add Admin section and hide Manage Admin section
function showAddAdmin() {
    document.getElementById('addAdmin_form').style.display = 'block';
    document.getElementById('manageAdmin_form').style.display = 'none';
}

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
    authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
    databaseURL: "https://guesthousebookingsystem-675c6-default-rtdb.firebaseio.com",
    projectId: "guesthousebookingsystem-675c6",
    storageBucket: "guesthousebookingsystem-675c6.appspot.com",
    messagingSenderId: "979837493640",
    appId: "1:979837493640:web:64745b6eefd825d4c31a3d"
};

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

// Function to toggle password visibility
function togglePassword() {
    var passwordInput = document.getElementById("passwordInput");
    var passwordToggle = document.getElementById("passwordToggle");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        // Change icon to hide password
        passwordToggle.classList.remove("fa-eye-slash");
        passwordToggle.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        // Change icon to show password
        passwordToggle.classList.remove("fa-eye");
        passwordToggle.classList.add("fa-eye-slash");
    }
}

// Define function to show addAdmin_form and hide manageAdmin_form
function addAdminForm() {
    document.getElementById('addAdmin_form').style.display = 'block';
    document.getElementById('manageAdmin_form').style.display = 'none';
}

// Function to generate admin ID
async function generateAdminID() {
    try {
        const adminsRef = firebase.database().ref('admins');
        const snapshot = await adminsRef.limitToLast(1).once('value');
        const lastAdmin = snapshot.val();

        if (!lastAdmin) {
            // If no previous admin IDs found, set a default admin ID
            return 'admin101';
        }

        const lastAdminID = Object.keys(lastAdmin)[0];
        const lastNumber = parseInt(lastAdminID.substring(5)); // Extract number part of admin ID

        if (isNaN(lastNumber)) {
            throw new Error('Last admin ID is NaN');
        }

        // Increment lastNumber to generate next admin ID
        const newNumber = lastNumber + 1;
        let paddedNumber = String(newNumber).padStart(3, '0');

        return 'admin' + paddedNumber;
    } catch (error) {
        // Handle error gracefully, e.g., by setting a default admin ID
        return 'admin101';
    }
}

// Function to add admin
async function addAdmin() {
    try {
        // Generate adminID
        const adminID = await generateAdminID();

        // Get form data
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("passwordInput").value.trim(); // Corrected ID here
        const key = document.getElementById("key").value.trim(); // New line to get the key

        // Check if any field is empty
        if (adminID === '' || name === '' || email === '' || password === '' || key === '') {
            alert('Please fill in all the fields.');
            return;
        }

        // Check if key is a digit number
        if (!(/^\d+$/.test(key))) {
            alert('Key should be a digit number.');
            return;
        }

        // Push admin data to the "admins" node in the database
        firebase.database().ref('admins/' + adminID).set({
            adminID: adminID,
            name: name,
            email: email,
            password: password,
            key: key // Add key to the admin data
        }).then(function () {
            alert('Admin added successfully.');
            // Clear input fields after successful addition
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            document.getElementById("passwordInput").value = ''; // Corrected ID here
            document.getElementById("key").value = ''; // Clear key input
            window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/manageAdmin.html";
        }).catch(function (error) {
            console.error('Error adding admin: ', error);
            alert('An error occurred while adding admin.');
        });
    } catch (error) {
        console.error('Error adding admin: ', error);
        alert('An error occurred while adding admin.');
    }
}

// Update admin ID when the page loads
document.addEventListener('DOMContentLoaded', async function () {
    try {
        const adminId = await generateAdminID();
        if (adminId) {
            document.getElementById('admin_id').value = adminId;
        } else {
            console.error("Failed to generate Admin ID.");
        }
    } catch (error) {
        console.error("Error setting admin ID:", error);
    }
});