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

// Reference to your Firebase database
var database = firebase.database();

// Reference to the "feedback" node in your database
var feedbackRef = firebase.database().ref('feedback');

// Adding event listener for the Search button
document.querySelector('.clkbtn').addEventListener('click', function () {
    // Get the search type and search field value
    var searchType = document.getElementById('searchType').value;
    var searchField = document.getElementById('searchField').value.trim();

    // Call the function to search for feedback details
    searchFeedbackDetails(searchType, searchField);
});

// Function to search feedback details based on search type and field value
function searchFeedbackDetails(searchType, searchField) {
    // Clear previous search results
    var tableBody = document.querySelector('#searchResults tbody');
    tableBody.innerHTML = '';

    // Query the database based on the selected search type and field value
    if (searchType === 'all') {
        feedbackRef.once('value', function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    // Call a function to display feedback data in the table
                    displayFeedbackData(childSnapshot, tableBody);
                });
            } else {
                // Display error message if feedback data is not found
                displayErrorMessage("Feedback data not found.");
            }
        });
    } else {
        feedbackRef.orderByChild(searchType).equalTo(searchField).once('value', function (snapshot) {
            if (snapshot.exists()) {
                snapshot.forEach(function (childSnapshot) {
                    // Call a function to display feedback data in the table
                    displayFeedbackData(childSnapshot, tableBody);
                });
            } else {
                // Display error message if feedback data is not found
                displayErrorMessage("Feedback data not found.");
            }
        });
    }
}

// Function to display feedback data in the table
function displayFeedbackData(snapshot, tableBody) {
    var feedbackData = snapshot.val();
    var row = document.createElement("tr");

    // Create cells for each column
    var emailCell = document.createElement("td");
    emailCell.textContent = feedbackData.email;
    row.appendChild(emailCell);

    var nameCell = document.createElement("td");
    nameCell.textContent = feedbackData.fullName;
    row.appendChild(nameCell);

    var phoneCell = document.createElement("td");
    phoneCell.textContent = feedbackData.mobile;
    row.appendChild(phoneCell);

    var messageCell = document.createElement("td");
    messageCell.textContent = feedbackData.message;
    row.appendChild(messageCell);

    // Create a cell to hold the action buttons
    var actionCell = document.createElement("td");

    // Create and append the delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.width = "150px";
    deleteButton.style.padding = "5px";
    deleteButton.style.border = "1px solid #000";
    deleteButton.style.borderRadius = "45px";
    deleteButton.style.fontSize = "18px";
    deleteButton.style.fontWeight = "bolder";
    deleteButton.style.fontFamily = "'Courier New', Courier, monospace";
    deleteButton.style.backgroundColor = "rgb(226, 232, 239)";
    deleteButton.style.outline = "none";
    deleteButton.style.color = "#000";
    deleteButton.style.height = "50px";
    deleteButton.onclick = function () {
        deleteFeedback(snapshot.key); // Corrected to call deleteFeedback function
    };

    actionCell.appendChild(deleteButton);

    // Append action cell to the row
    row.appendChild(actionCell);

    // Append row to the table body
    tableBody.appendChild(row);
}

// Function to display error message
function displayErrorMessage(message) {
    var errorElement = document.createElement("tr");
    errorElement.innerHTML = `<td colspan="5">${message}</td>`;
    document.getElementById("searchResults").appendChild(errorElement);
}


// Function to delete feedback from the database
function deleteFeedback(feedbackKey) {
    // Proceed with deletion
    if (confirm("Are you sure you want to delete this feedback?")) {
        feedbackRef.child(feedbackKey).remove()
        .then(function () {
            alert("Feedback deleted successfully!");
        })
        .catch(function (error) {
            console.error("Error removing feedback: ", error);
            alert("An error occurred while deleting feedback.");
        });
    }
}