
const firebaseConfig = {
    apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
    authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
    databaseURL: "https://guesthousebookingsystem-675c6-default-rtdb.firebaseio.com",
    projectId: "guesthousebookingsystem-675c6",
    storageBucket: "guesthousebookingsystem-675c6.appspot.com",
    messagingSenderId: "979837493640",
    appId: "1:979837493640:web:64745b6eefd825d4c31a3d"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();
const ref = database.ref("bookings");

// Function to handle form submission for update
document.addEventListener('DOMContentLoaded', function () {
    const updateForm = document.getElementById('updateform');
    updateForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the selected option for update
        var updateOption = document.getElementById("change").value;

        // Perform update operation based on selected option
        if (updateOption === "DateF&T") {
            var dateFrom = document.getElementById("fromDate").value;
            var dateTo = document.getElementById("toDate").value;

            // Push data to Firebase
            ref.push({
                dateFrom: dateFrom,
                dateTo: dateTo
                // Add other form fields here
            }, function (error) {
                if (error) {
                    alert("Error occurred while saving data: " + error.message);
                } else {
                    alert("Modification Succesfull");
                    window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
                }
            });
        } else if (updateOption === "guesthouse") {
            var selectedGuesthouse = document.getElementById("guesthouse").value;
            var selectedRoomType = document.getElementById("roomType").value;

            // Push data to Firebase
            ref.push({
                guesthouse: selectedGuesthouse,
                roomType: selectedRoomType
                // Add other form fields here
            }, function (error) {
                if (error) {
                    alert("Error occurred while saving data: " + error.message);
                } else {
                    alert("Modification Succesfull");
                    window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
                }
            });
        } else if (updateOption === "Occupacy") {
            var selectedOccupancy = document.getElementById("occupancy").value;

            // Push data to Firebase
            ref.push({
                occupacy: selectedOccupancy
                // Add other form fields here
            }, function (error) {
                if (error) {
                    alert("Error occurred while saving data: " + error.message);
                } else {
                    alert("Modification Succesfull");
                    window.location.href="https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
                }
            });
        }
    });

    // Function to handle cancel button click
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', function () {
        // Perform session timeout
        // Redirect user to login/signup page
        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/login_signup.html";
    });
});