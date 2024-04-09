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
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// Initialize Firebase Authentication
var auth = firebase.auth();

// Add event listener for authentication state change
auth.onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in, enable check-in and check-out functionality
        document.getElementById("searchBtn").disabled = false;
    } else {
        // No user is signed in, disable check-in and check-out functionality
        document.getElementById("searchBtn").disabled = true;
    }
});

// Search button click event
document.getElementById("searchBtn").addEventListener("click", function() {
    var searchType = document.getElementById("searchType").value;
    var searchField = document.getElementById("searchField").value;

    // Perform search based on criteria
    var query = database.ref("bookings").orderByChild(searchType).equalTo(searchField);
    query.once("value")
    .then(function(snapshot) {
        var resultsTable = document.getElementById("searchResultsBody");
        resultsTable.innerHTML = ""; // Clear previous results

        snapshot.forEach(function(childSnapshot) {
            var data = childSnapshot.val();
            var row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.bookingID}</td>
                <td>${data.name}</td>
                <td>${data.email}</td>
                <td>${data.phone}</td>
                <td>${data.guestHouse}</td>
                <td>${data.roomType}</td>
                <td>${data.occupacy}</td>
                <td>${data.status}</td>
                <td>
                    <button onclick="checkIn('${childSnapshot.key}')">Check-In</button>
                    <button onclick="checkOut('${childSnapshot.key}')">Check-Out</button>
                </td>
            `;
            resultsTable.appendChild(row);
        });
    })
    .catch(function(error) {
        alert("Error getting data: " + error);
    });
});

// Function to perform check-in
function checkIn(bookingKey) {
    // Check if user is authenticated
    var user = auth.currentUser;
    if (user) {
        // Prompt the user to enter the room number
        var roomNo = prompt("Enter the room number:");
        if (roomNo === null || roomNo === "") {
            alert("Room number cannot be empty. Check-in aborted.");
            return;
        }
        
        // Retrieve booking details
        var bookingRef = firebase.database().ref("bookings/" + bookingKey);
        bookingRef.once("value")
        .then(function(snapshot) {
            var bookingData = snapshot.val();
            // Check if the status is 'upcoming'
            if (bookingData.status === "upcoming") {
                // Update status to 'active', set check-in time, and store room number
                var currentTime = new Date().toLocaleString();
                var updates = {};
                updates["bookings/" + bookingKey + "/status"] = "active";
                updates["bookings/" + bookingKey + "/checkInTime"] = currentTime;
                updates["bookings/" + bookingKey + "/roomNo"] = roomNo; // Add room number
                firebase.database().ref().update(updates)
                .then(function() {
                    alert("Check-in successful");
                })
                .catch(function(error) {
                    console.error("Error updating check-in:", error);
                });
            } else {
                alert("Cannot check-in. Status is not 'upcoming'.");
            }
        })
        .catch(function(error) {
            console.error("Error retrieving booking data:", error);
        });
    } else {
        alert("User not authenticated");
    }
}

// Function to perform check-out
function checkOut(bookingKey) {
    // Check if user is authenticated
    var user = auth.currentUser;
    if (user) {
    // Retrieve booking details
    var bookingRef = firebase.database().ref("bookings/" + bookingKey);
    bookingRef.once("value")
        .then(function(snapshot) {
            var bookingData = snapshot.val();
            // Check if the status is 'active'
            if (bookingData.status === "active") {
                // Update status to 'visited' and set check-out time
                var currentTime = new Date().toLocaleString();
                var updates = {};
                updates["bookings/" + bookingKey + "/status"] = "visited";
                updates["bookings/" + bookingKey + "/checkOutTime"] = currentTime;
                firebase.database().ref().update(updates)
                .then(function() {
                    alert("Check-out successful");
                })
                .catch(function(error) {
                    console.error("Error updating check-out:", error);
                });
            } else {
                alert("Cannot check-out. Status is not 'active'.");
            }
        })
        .catch(function(error) {
            console.error("Error retrieving booking data:", error);
        });
    } else {
        alert("User not authenticated");
    }
}