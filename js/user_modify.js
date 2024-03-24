(function () {
    const firebaseConfig = {
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
        // Firebase app is not initialized, so initialize it
        firebase.initializeApp(firebaseConfig);
    }

    const database = firebase.database();
    const reference = firebase.database().ref("bookings");

    document.addEventListener('DOMContentLoaded', function () {
        const updateForm = document.getElementById('updateform');
        const updateButton = document.getElementById('updateButton');
        const cancelButton = document.getElementById('cancelButton');

        updateButton.addEventListener('click', function (e) {
            e.preventDefault();
            updateBooking();
        });

        cancelButton.addEventListener('click', function (e) {
            e.preventDefault();
            cancelBooking();
        });
    });

    function updateBooking() {
        const bookingID = document.getElementById('bookingIDInput').value.trim(); // Get booking ID from the form
        const bookingRef = reference.child(bookingID); // Reference to the specific booking using its ID
        const updateOption = document.getElementById("change").value;
    
        if (bookingID) {
            // Check if the booking ID exists in Firebase
            bookingRef.once('value', function(snapshot) {
                if (snapshot.exists()) {
                    // Proceed with updating existing record
                    if (updateOption === "DateF&T") {
                        // Update date and time
                        const dateFrom = new Date(document.getElementById('fromDate').value);
                        const dateTo = new Date(document.getElementById('toDate').value());
                
                        bookingRef.update({
                            dateFrom: dateFrom.toISOString(),
                            dateTo: dateTo.toISOString()
                        }).then(function () {
                            alert("Modification Successful");
                        }).catch(function (error) {
                            console.error("Error updating date:", error);
                            alert("Error occurred while updating date: " + error.message);
                        });
                    } else if (updateOption === "guesthouse") {
                        // Update guesthouse and room type
                        const selectedGuesthouse = document.getElementById("guest_house").value.trim();
                        const selectedRoomType = document.getElementById("room_type").value.trim();
                        bookingRef.update({
                            guestHouse: selectedGuesthouse,
                            roomType: selectedRoomType
                        }).then(function () {
                            alert("Modification Successful");
                        }).catch(function (error) {
                            console.error("Error updating guesthouse:", error);
                            alert("Error occurred while updating guesthouse: " + error.message);
                        });
                    } else if (updateOption === "Occupacy") {
                        // Update occupancy
                        const selectedOccupancy = document.getElementById("occupancy").value.trim();
                        bookingRef.update({
                            occupancy: selectedOccupancy
                        }).then(function () {
                            alert("Modification Successful");
                        }).catch(function (error) {
                            console.error("Error updating occupancy:", error);
                            alert("Error occurred while updating occupancy: " + error.message);
                        });
                    }
                } else {
                    alert("Booking ID does not exist.");
                }
            });
        } else {
            console.error("Element with ID 'bookingID' not found.");
        }
    }
    
    function cancelBooking() {
        const bookingID = document.getElementById('bookingIDInput').value.trim();
        const bookingRef = reference.child(bookingID);

        bookingRef.once('value', function (snapshot) {
            const bookingData = snapshot.val();
            if (bookingData.status === "Upcoming") {
                bookingRef.update({ status: "Cancelled" })
                    .then(function () {
                        alert("Booking canceled successfully.");
                    })
                    .catch(function (error) {
                        alert("Error canceling booking: " + error);
                    });
            } else {
                alert("Booking cannot be canceled.");
            }
        });
    }


    function updateRoomOptions() {
        // Function to update room options based on selected guest house
        const guestHouse = document.getElementById('guest_house').value;
        const roomTypeSelect = document.getElementById('room_type');
        roomTypeSelect.innerHTML = ''; // Clear existing options

        if (guestHouse === 'igh') {
            // Add options for IGH Guest House
            const options = [
                { value: 'single', text: 'Single' },
                { value: 'mezzanine', text: 'Mezzanine' },
                { value: 'suite', text: 'Suite' }
            ];

            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                roomTypeSelect.appendChild(optionElement);
            });
        } else if (guestHouse === 'ogh') {
            // Add options for OGH Guest House
            const options = [
                { value: 'single', text: 'Single' },
                { value: 'suite', text: 'Suite' }
            ];

            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                roomTypeSelect.appendChild(optionElement);
            });
        }
    }


    document.getElementById('proceedButton').addEventListener('click', function () {
        proceedWithUpdate();
    });

    function proceedWithUpdate() {
        updateOption = document.getElementById("change").value;

        // Show/hide fields based on selected option
        document.getElementById('guesthouseFields').style.display = updateOption === 'guesthouse' ? 'block' : 'none';
        document.getElementById('dateFields').style.display = updateOption === 'DateF&T' ? 'block' : 'none';
        document.getElementById('occupancyFields').style.display = updateOption === 'Occupacy' ? 'block' : 'none';
    }
})();
