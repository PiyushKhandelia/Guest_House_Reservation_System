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

// Initialize Firebase first
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

// Reference to your Firebase database
var database = firebase.database();

// Reference to the "admins" node in your database
var adminsRef = firebase.database().ref('admins');

// Adding event listener for the Search button
document.querySelector('#manageAdmin_form button').addEventListener('click', function () {
    // Get the search type and search field value
    var searchType = document.getElementById('searchType').value;
    var searchField = document.getElementById('searchField').value.trim();

    // Validate the search field
    if (searchField === '') {
        alert('Please enter a search value.');
        return;
    }

    // Call the function to search for admin details
    searchAdminDetails(searchType, searchField);
});

// Function to search admin details based on search type and field value
function searchAdminDetails(searchType, searchField) {
    // Reference to the "admins" node in your database
    var adminsRef = firebase.database().ref('admins');

    // Clear previous search results
    var tableBody = document.querySelector('#searchResults tbody');
    tableBody.innerHTML = '';

    // Query the database based on the selected search type and field value
    adminsRef.orderByChild(searchType).equalTo(searchField).once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (childSnapshot) {
                // Call a function to display admin data in the table
                displayAdminData(childSnapshot, tableBody);
            });
        } else {
            // Display error message if admin data is not found
            displayErrorMessage("Admin data not found.");
        }
    });
}

// Declare tableBody globally
var tableBody = document.querySelector('#searchResults tbody');

// Function to delete an admin
function deleteAdmin(adminID) {
    var isMasterAdmin = confirm("Are you the master admin?");
    if (isMasterAdmin) {
        var masterID = prompt("Enter Master ID:");
        if (masterID === "masterAdmin") {
            if (confirm("Are you sure you want to delete this admin?")) {
                var adminRef = firebase.database().ref('admins/' + adminID);

                adminRef.remove()
                .then(function () {
                    // Redirect to manageAdmin.html upon successful deletion
                    alert("Admin deleted Successfully");
                    window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/manageAdmin.html";
                });
            }
        } else {
            alert("You are not authorized to perform this action.");
        }
    } else {
        var userKey = prompt("Enter the key to confirm deletion:");
        var adminsRef = firebase.database().ref('admins');
        adminsRef.child(adminID).once('value', function(snapshot) {
            var adminData = snapshot.val();
            var adminKey = adminData.key; // Assuming the key is stored in the 'key' attribute

            if (userKey === adminKey) {
                if (confirm("Are you sure you want to delete this admin?")) {
                    var adminRef = firebase.database().ref('admins/' + adminID);

                    adminRef.remove()
                    .then(function () {
                        // Redirect to manageAdmin.html upon successful deletion
                        alert("Admin deleted Successfully");
                        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/manageAdmin.html";
                    });
                }
            } else {
                alert("You are not authorized to perform this action.");
            }
        });
    }
}

// Function to display admin data in the table
function displayAdminData(snapshot, tableBody) {
    var adminData = snapshot.val();
    var row = document.createElement("tr");

    // Create cells for each column
    var adminIDCell = document.createElement("td");
    adminIDCell.textContent = adminData.adminID;
    row.appendChild(adminIDCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = adminData.name;
    row.appendChild(nameCell);

    var emailCell = document.createElement("td");
    emailCell.textContent = adminData.email;
    row.appendChild(emailCell);

    // Create action buttons
    var updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.onclick = function () {
        showUpdateForm(snapshot.key); // Passing the admin ID to showUpdateForm
    };

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
        deleteAdmin(snapshot.key); // Corrected to call deleteAdmin function
    };

    // Create a cell to hold the action buttons
    var actionCell = document.createElement("td");
    actionCell.appendChild(updateButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(actionCell);

    // Append row to the table body
    tableBody.appendChild(row);
}

// Function to display error message
function displayErrorMessage(message) {
    var errorElement = document.createElement("tr");
    errorElement.innerHTML = `<td colspan="3">${message}</td>`;
    document.getElementById("searchResults").appendChild(errorElement);
}

// Function to show the update form
function showUpdateForm(adminID) {
    var masterAdmin = confirm("Are you a master admin?");
    if (masterAdmin) {
        var masterID = prompt("Enter Master ID:");
        if (masterID === "masterAdmin") {
            document.getElementById('updateForm').style.display = 'block';
            document.getElementById('manageAdmin_form').style.display = 'none';
            document.getElementById('adminIDInput').value = adminID; // Set the admin ID in the form
        } else {
            alert("You are not authorized to perform this action.");
        }
    } else {
        var inputKey = prompt("Are you sure you want to edit this admin? If yes, enter your key.");
        var adminRef = firebase.database().ref('admins/' + adminID);
        adminRef.once('value', function(snapshot) {
            if (snapshot.exists()) {
                var adminData = snapshot.val();
                if (adminData.key === inputKey) {
                    document.getElementById('updateForm').style.display = 'block';
                    document.getElementById('manageAdmin_form').style.display = 'none';
                    document.getElementById('adminIDInput').value = adminID; // Set the admin ID in the form
                } else {
                    alert("Invalid key.");
                }
            } else {
                alert("Admin data not found.");
            }
        });
    }
}

// Function to update admin data
function updateData() {
    // Get the admin ID from the form
    var adminID = document.getElementById('adminIDInput').value;

    // Get the field to be updated and its new value
    var fieldToUpdate = document.getElementById('change').value;
    var newValue = document.getElementById('updateText').value;

    // Reference to the admin node to be updated
    var adminRef = firebase.database().ref('admins/' + adminID);

    // Update the specific field with the new value
    adminRef.update({
        [fieldToUpdate]: newValue
    }) .then(function () {
    // Redirect or display success message upon successful update
        alert("Admin data updated successfully");
        // Redirect to manageAdmin.html or any other page if needed
        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/manageAdmin.html";
    }) .catch(function (error) {
        // Handle errors here
        console.error("Error updating admin data: ", error);
        alert("Error updating admin data. Please try again.");
    });
}