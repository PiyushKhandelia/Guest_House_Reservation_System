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
    firebase.initializeApp(firebaseConfig);
}

// Wrap Script 2 in an IIFE
(function () {
    // Define showUpdateForm function
    function showUpdateForm() {
        document.getElementById('my_search_form').style.display = 'none';
        document.getElementById('updateForm').style.display = 'block';
    }

    // Reference to your Firebase database
    var database = firebase.database();

    // Function to search for data based on field type and field value
function searchByField(fieldType, fieldValue, statusFilter) {
    var tableBody = document.querySelector("#searchResults tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Reference to the "bookings" node in your database
    var bookingsRef = firebase.database().ref('bookings');

    // Query the database based on the selected field type and field value
    if (fieldType === "bookingID") {
        // Search by booking ID
        bookingsRef.orderByChild('bookingID').equalTo(fieldValue).once('value', function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    displayBookingData(childSnapshot, tableBody, statusFilter);
                });
            } else {
                // Display error message if booking ID is not found
                displayErrorMessage("Booking ID not found.");
            }
        });
    } else if (fieldType === "phonenumber") {
        // Search by phone number
        bookingsRef.orderByChild('phone').equalTo(fieldValue).once('value', function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    displayBookingData(childSnapshot, tableBody, statusFilter);
                });
            } else {
                // Display error message if phone number is not found
                displayErrorMessage("Phone number not found.");
            }
        });
    }
}

// Function to display error message
function displayErrorMessage(message) {
    var errorElement = document.createElement("p");
    errorElement.textContent = message;
    document.getElementById("searchResults").appendChild(errorElement);

    // Remove error message after 4 seconds
    setTimeout(function() {
        errorElement.remove();
    }, 4000); // 4 seconds (4000 milliseconds)
}

// Function to display booking data in the table based on status filter
function displayBookingData(snapshot, tableBody, statusFilter) {
    var bookingData = snapshot.val();

    // Check if status filter matches the booking status
    if (!statusFilter || statusFilter === 'All' || bookingData.status === statusFilter) {
        var row = document.createElement("tr");

        // Create cells for each column
        var bookingIDCell = document.createElement("td");
        bookingIDCell.textContent = bookingData.bookingID;
        row.appendChild(bookingIDCell);

        var nameCell = document.createElement("td");
        nameCell.textContent = bookingData.name;
        row.appendChild(nameCell);
        
        var genderCell = document.createElement("td");
        genderCell.textContent = bookingData.gender;
        row.appendChild(genderCell);
        
        var categoryCell = document.createElement("td");
        categoryCell.textContent = bookingData.category;
        row.appendChild(categoryCell);

        var guestHouseCell = document.createElement("td");
        guestHouseCell.textContent = bookingData.guestHouse;
        row.appendChild(guestHouseCell);

        var roomTypeCell = document.createElement("td");
        roomTypeCell.textContent = bookingData.roomType;
        row.appendChild(roomTypeCell);

        var checkInCell = document.createElement("td");
        checkInCell.textContent = bookingData.dateFrom;
        row.appendChild(checkInCell);

        var checkOutCell = document.createElement("td");
        checkOutCell.textContent = bookingData.dateTo;
        row.appendChild(checkOutCell);

        var statusCell = document.createElement("td");
        statusCell.textContent = bookingData.status;
        row.appendChild(statusCell);

        // Create action buttons
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function () {
            showUpdateForm(); // Passing the booking ID to updateBooking
        };

        var cancelButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        cancelButton.onclick = function () {
            cancelBooking(snapshot.key); // Passing the booking ID to cancelBooking
        };

        // Create a cell to hold the action buttons
        var actionCell = document.createElement("td");
        actionCell.appendChild(updateButton);
        actionCell.appendChild(cancelButton);

        row.appendChild(actionCell);

        // Append row to the table body
        tableBody.appendChild(row);
    }
}

    // Function to cancel a booking
    function cancelBooking(bookingID) {
        var bookingRef = firebase.database().ref('bookings/' + bookingID);
        bookingRef.once('value', function (snapshot) {
            var bookingData = snapshot.val();
            if (bookingData.status === "Upcoming") {
                bookingRef.update({ status: "Cancelled" })
                    .then(function () {
                        alert("Booking canceled successfully.");
                    })
                    .catch(function (error) {
                        alert("Error canceling booking:", error);
                    });
            } else {
                alert("Booking cannot be canceled.");
            }
        });
    }

    // Function to handle form submission
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('searchform');
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the search type and field value from the form
            var searchType = document.getElementById("searchType").value;
            var searchField = document.getElementById("searchField").value;
            var statusFilter = document.getElementById("statusFilter").value;

            // Call the search function with the search type, field value, and status filter
            searchByField(searchType, searchField, statusFilter);
        });
    });

})();