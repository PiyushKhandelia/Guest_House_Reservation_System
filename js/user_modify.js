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

    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
    const reference = firebase.database().ref("bookings");
    let updateOption;

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

    document.getElementById('guest_house').addEventListener('change', updateRoomOptions);

    document.addEventListener('DOMContentLoaded', function () {
        const updateForm = document.getElementById('updateform');
        updateForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const bookingID = document.getElementById('booking_id').value.trim();
            const bookingRef = reference.child(bookingID);
            const updateOption = document.getElementById("change").value;

            if (updateOption === "DateF&T") {
                // Update date and time
                const dateFrom = new Date(document.getElementById('fromDate').value);
                    const dateTo = new Date(document.getElementById('toDate').value);
        
                    bookingRef.update({
                        dateFrom: dateFrom.toISOString(),
                        dateTo: dateTo.toISOString()
                    }).then(function () {
                        alert("Modification Successful");
                        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
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
                        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
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
                        window.location.href = "https://piyushkhandelia.github.io/Guest_House_Reservation_System/Pages/my_bookings.html";
                    }).catch(function (error) {
                        console.error("Error updating occupancy:", error);
                        alert("Error occurred while updating occupancy: " + error.message);
                    });
            }
        });
    });

    document.getElementById('cancelButton').addEventListener('click', function () {
        const bookingIDElement = document.getElementById('booking_id');
        if (bookingIDElement) {
            const bookingID = bookingIDElement.value.trim();
            const bookingRef = reference.child(bookingID);
            const updateOption = document.getElementById("change").value;

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
        } else {
            console.error("Element with ID 'booking_id' not found.");
        }
    });

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
