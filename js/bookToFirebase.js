            // Your web app's Firebase configuration
            const firebaseConfig = {
                apiKey: "AIzaSyBRI8aRPiHrQL9fWgNH9JgWpBtD8GTPuv8",
                authDomain: "guesthousebookingsystem-675c6.firebaseapp.com",
                databaseURL: "https://guesthousebookingsystem-675c6-default-rtdb.firebaseio.com",
                projectId: "guesthousebookingsystem-675c6",
                storageBucket: "guesthousebookingsystem-675c6.appspot.com",
                messagingSenderId: "979837493640",
                appId: "1:979837493640:web:56a264b9fc7e8d94c31a3d"
              };

            firebase.initializeApp(firebaseConfig);
            const database = firebase.database()
            const ref = database.ref("bookings")

            function book_now(event) {
                event.preventDefault();
                var name = document.getElementById("name").value.trim();
                var email = document.getElementById("email").value.trim();
                var phone = document.getElementById("phone").value.trim();
                var category = document.getElementById("category").value.trim();
                var idProof = document.getElementById("id_proof").value.trim();
                var idProofNumber = document.getElementById("id_proof_number").value.trim();
                var gender = document.getElementById("gender").value.trim();
                var permanentAddressLocation = document.getElementById("permanent_address_location").value.trim();
                var permanentAddressPin = document.getElementById("permanent_address_pin").value.trim();
                var permanentAddressState = document.getElementById("permanent_address_state").value.trim();
                var permanentAddressArea = document.getElementById("permanent_address_area").value.trim();
                var enteredCaptcha = document.getElementById("textInput").value.trim();
                var displayedCaptcha = document.getElementById("capt").value.trim();
                var guestHouse = this.value;
                var roomType = document.getElementById('room_type').value;
                var bookedRoom = " ";
                var roomNo = bookedRoom;
                var dateFrom = new Date(document.getElementById('dateF').value);
                var dateTrue = new Date(this.value);
                var duration = document.getElementById('duration').value;
                var dateTime = " ";
                
                // Initialize the arrays
                var singleRoomAvailable_OGH = [101, 102, 103, 104, 201, 202, 203, 204];
                var suitesAvailable_OGH = [1001, 1002, 2001, 2002];
                var singleRoomAvailable_IGH = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 201, 202, 203, 204, 205, 206, 207, 214, 215, 216];
                var mesaninAvailable_IGH = [208, 209, 210, 211, 212, 213];
                var suitesAvailable_IGH = [1001, 1002, 2001, 2002];
                var singleRoomBooked_OGH = [];
                var suitesBooked_OGH = [];
                var singleRoomBooked_IGH = [];
                var mesaninBooked_IGH = [];
                var suitesBooked_IGH = [];
                
                //Iniyalize the variables
                var currentDate = new Date();

                // Get the current date and time components
                var year = currentDate.getFullYear();
                var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
                var day = ('0' + currentDate.getDate()).slice(-2);
                var hours = ('0' + currentDate.getHours()).slice(-2);
                var minutes = ('0' + currentDate.getMinutes()).slice(-2);
                var seconds = ('0' + currentDate.getSeconds()).slice(-2);

                // Create a formatted string for date and time
                dateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

                if (enteredCaptcha === displayedCaptcha) {
                    // Check guest house and room type and book accordingly
                    if (guestHouse === 'ogh' && roomType === 'single') {
                        if (singleRoomAvailable_OGH.length > 0) {
                            // Shift one element from singleRoomAvailable to singleRoomBooked
                            bookedRoom = singleRoomAvailable_OGH.shift();
                            singleRoomBooked_OGH.push(bookedRoom);
                        } else {
                            alert("Room is unavailable");
                            return false; // Prevent form submission
                        }   
                    } else if (guestHouse === 'ogh' && roomType === 'suite') {
                        if (suitesAvailable_OGH.length > 0) {
                            // Shift one element from singleRoomAvailable to singleRoomBooked
                            bookedRoom = suitesAvailable_OGH.shift();
                            suitesBooked_OGH.push(bookedRoom);
                        } else {
                            alert("Room is unavailable");
                            return false; // Prevent form submission
                        }
                    } else if (guestHouse === 'igh' && roomType === 'single') {
                        if (singleRoomAvailable_IGH.length > 0) {
                            // Shift one element from singleRoomAvailable to singleRoomBooked
                            bookedRoom = singleRoomAvailable_IGH.shift();
                            singleRoomBooked_IGH.push(bookedRoom);
                        } else {
                            alert("Room is unavailable");
                            return false; // Prevent form submission
                        }
                    } else if (guestHouse === 'igh' && roomType === 'mesanin') {
                        if (mesaninAvailable_IGH.length > 0) {
                            // Shift one element from singleRoomAvailable to singleRoomBooked
                            bookedRoom = mesaninAvailable_IGH.shift();
                            mesaninBooked_IGH.push(bookedRoom);
                        } else {
                            alert("Room is unavailable");
                            return false; // Prevent form submission
                        }
                    } else if (guestHouse === 'igh' && roomType === 'suite') {
                        if (suitesAvailable_IGH.length > 0) {
                            // Shift one element from singleRoomAvailable to singleRoomBooked
                            bookedRoom = suitesAvailable_IGH.shift();
                            suitesBooked_IGH.push(bookedRoom);
                        } else {
                            alert("Room is unavailable");
                            return false; // Prevent form submission
                        }
                    }
                    // Push data to Firebase
                    ref.push({
                        name: name,
                        email: email,
                        phone: phone,
                        category: category,
                        idProof: idProof,
                        idProofNumber: idProofNumber,
                        gender: gender,
                        permanentAddressLocation: permanentAddressLocation,
                        permanentAddressPin: permanentAddressPin,
                        permanentAddressState: permanentAddressState,
                        permanentAddressArea: permanentAddressArea,
                        guestHouse: guestHouse,
                        roomType: roomType,
                        dateFrom: dateFrom,
                        dateTo: dateTo,
                        duration: duration
                    }, function(error) {
                        if (error) {
                            alert("Error occurred while saving data: " + error.message);
                        } else {
                            alert("Booking Success");
                        }
                    });
                    return true; // Form is valid
                } else if (name === "" || email === "" || phone === "" || category === "" || idProof === "" ||
                    idProofNumber === "" || gender === "" || permanentAddressLocation === "" ||
                    permanentAddressPin === "" || permanentAddressState === "" || permanentAddressArea === "" ||
                    roomType === "" || enteredCaptcha === "") {
                            alert("Please fill in all mandatory fields.");
                            return false; // Prevent form submission
                } else if (enteredCaptcha !== displayedCaptcha) {
                    // Display the "Invalid Captcha" alert
                    var alertTimeout = setTimeout(function() {
                        alert("Invalid Captcha");
                    }, 500);
                    return false; // Prevent form submission
                }
            }
