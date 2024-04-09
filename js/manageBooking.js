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

firebase.initializeApp(firebaseConfig);

// Reference to your Firebase database
var database = firebase.database();

// Reference to the "bookings" node in your database
var bookingsRef = firebase.database().ref('bookings');

// Function to show Manage Booking section and hide Add Booking section
function showManageBooking() {
    var manageBookingForm = document.getElementById('manageBooking_form');
    if (manageBookingForm) {
        manageBookingForm.style.display = 'block';
        var addBookingForm = document.getElementById('addBooking_form');
        if (addBookingForm) {
            addBookingForm.style.display = 'none';
        }
        var updateBookingForm = document.getElementById('updateBooking_Form');
        if (updateBookingForm) {
            updateBookingForm.style.display = 'none';
        }
    }
}

// Function to show Update Booking section and hide Manage Booking section
function showUpdateBooking() {
    var updateBookingForm = document.getElementById('updateBooking_Form');
    if (updateBookingForm) {
        updateBookingForm.style.display = 'block';
        var manageBookingForm = document.getElementById('manageBooking_form');
        if (manageBookingForm) {
            manageBookingForm.style.display = 'none';
        }
    }
}

// Adding event listener for the Search button in the manageBooking_form
document.querySelector('#manageBooking_form button').addEventListener('click', function () {
// Get the search type and search field value
var searchType = document.getElementById('searchType').value;
var searchField = document.getElementById('searchField').value.trim();

// Validate the search field
if (searchField === '') {
    alert('Please enter a search value.');
    return;
}

// Call the function to search for booking details
searchBookingDetails(searchType, searchField);
});

// Function to search booking details based on search type and field value
function searchBookingDetails() {

// Reference to the "bookings" node in your database
var bookingsRef = firebase.database().ref('bookings');

// Clear previous search results
var tableBody = document.querySelector('#searchResults tbody');
tableBody.innerHTML = '';

// Get the search type and search field value
var searchType = document.getElementById('searchType').value;
var searchField = document.getElementById('searchField').value.trim();

// Query the database based on the selected search type and field value
bookingsRef.orderByChild(searchType).equalTo(searchField).once('value', function(snapshot) {
    if (snapshot.exists()) {
        snapshot.forEach(function(childSnapshot) {
            // Call a function to display booking data in the table
            displayBookingData(childSnapshot, tableBody);
        });
    } else {
        // Display error message if booking data is not found
        displayErrorMessage("No bookings found for the provided search criteria.");
    }
});
}

// Function to update booking data
function updateBookingData() {
var bookingID = document.getElementById('bookingIDInput').value;
var fieldToUpdate = document.getElementById('change').value;
var newValue = document.getElementById('updateText').value;

var bookingRef = firebase.database().ref('bookings/' + bookingID);

bookingRef.update({
    [fieldToUpdate]: newValue
}).then(function () {
    alert("Booking data updated successfully");
    window.location.reload(); // Refresh the page after update
}).catch(function (error) {
    console.error("Error updating booking data: ", error);
    alert("Error updating booking data. Please try again.");
});
}    

// Function to display booking data in the table
function displayBookingData(snapshot, tableBody) {
var bookingData = snapshot.val();
var row = document.createElement("tr");

// Create cells for each column
var bookingIDCell = document.createElement("td");
bookingIDCell.textContent = snapshot.key; // Booking ID
row.appendChild(bookingIDCell);

var nameCell = document.createElement("td");
nameCell.textContent = bookingData.name;
row.appendChild(nameCell);

var emailCell = document.createElement("td");
emailCell.textContent = bookingData.email;
row.appendChild(emailCell);

var phoneCell = document.createElement("td");
phoneCell.textContent = bookingData.phone;
row.appendChild(phoneCell);

var guestHouseCell = document.createElement("td");
guestHouseCell.textContent = bookingData.guestHouse;
row.appendChild(guestHouseCell);

var roomTypeCell = document.createElement("td");
roomTypeCell.textContent = bookingData.roomType;
row.appendChild(roomTypeCell);

var dateTimeCell = document.createElement("td");
dateTimeCell.textContent = bookingData.dateTime;
row.appendChild(dateTimeCell);

var dateFromCell = document.createElement("td");
dateFromCell.textContent = bookingData.dateFrom;
row.appendChild(dateFromCell);

var checkInTimeCell = document.createElement("td");
checkInTimeCell.textContent = bookingData.checkInTime;
row.appendChild(checkInTimeCell);

// Create action buttons
var cancelBookingButton = document.createElement("button");
cancelBookingButton.textContent = "Cancel";
cancelBookingButton.onclick = function () {
    cancelBooking(snapshot.key); // Passing the booking ID to cancelBooking
};

// Create action buttons
var updateBookingButton = document.createElement("button");
updateBookingButton.textContent = "update";
updateBookingButton.onclick = function () {
    showUpdateBooking();
};

// Create a cell to hold the action buttons
var actionCell = document.createElement("td");
actionCell.appendChild(cancelBookingButton);
actionCell.appendChild(updateBookingButton);

row.appendChild(actionCell);

// Append row to the table body
tableBody.appendChild(row);
}

// Function to cancel a booking
function cancelBooking(bookingID) {
if (confirm("Are you sure you want to cancel this booking?")) {
    var bookingRef = firebase.database().ref('bookings/' + bookingID);

    // Update the status to 'cancel'
    bookingRef.update({
        status: 'cancel'
    }).then(function () {
        // Redirect or display success message upon successful cancellation
        alert("Booking canceled successfully");
        // Redirect to manageBooking.html or any other page if needed
        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/manageBooking.html";
    }).catch(function (error) {
        // Handle errors here
        console.error("Error canceling booking: ", error);
        alert("Error canceling booking. Please try again.");
    });
}
}

// Function to display error message
function displayErrorMessage(message) {
var errorElement = document.createElement("tr");
errorElement.innerHTML = `<td colspan="3">${message}</td>`;
document.getElementById("searchResults").appendChild(errorElement);
}