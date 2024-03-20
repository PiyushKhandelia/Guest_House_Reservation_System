const firebaseConfig = {
    apiKey: "Your API Key",
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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookingform');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        bookNow();
    });
});

// Define global variable
let enteredCaptcha;
let displayedCaptcha;
let captchaVerified;
let guestHouse;

function bookNow() {
    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email =  document.getElementById('email').value.trim();
    const inst_email =  document.getElementById('inst_email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const alt_phone = document.getElementById('alt_phone').value.trim();
    const category = document.getElementById('category').value.trim();
    const idProof = document.getElementById('id_proof').value.trim();
    const idProofNumber = document.getElementById('id_proof_number').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const permanentAddressLocation = document.getElementById('permanent_address_location').value.trim();
    const permanentAddressPin = document.getElementById('permanent_address_pin').value.trim();
    const permanentAddressState = document.getElementById('permanent_address_state').value.trim();
    const permanentAddressArea = document.getElementById('permanent_address_area').value.trim();
    enteredCaptcha = document.getElementById('textInput').value.trim();
    displayedCaptcha = document.getElementById('capt').value.trim();
    const guestHouse = document.getElementById('guest_house').value.trim();
    const roomType = document.getElementById('room_type').value.trim();
    const dateFrom = new Date(document.getElementById('dateF').value);
    const dateTo =  new Date(document.getElementById('dateT').value);
    const duration = document.getElementById('duration').value.trim();

    function validateFields(name, email, phone, category, idProof, idProofNumber, gender, permanentAddressLocation, permanentAddressPin, permanentAddressState, permanentAddressArea, guestHouse, dateF, dateT, roomType, enteredCaptcha) {
       // Your field validation logic goes here
        const emptyFields = [];

        if (name === "") emptyFields.push("Name");
        if (email === "") emptyFields.push("Email");
        if (phone === "") emptyFields.push("Phone");
        if (category === "") emptyFields.push("Category");
        if (idProof === "") emptyFields.push("ID Proof");
        if (idProofNumber === "") emptyFields.push("ID Proof Number");
        if (gender === "") emptyFields.push("Gender");
        if (permanentAddressLocation === "") emptyFields.push("Permanent Address Location");
        if (permanentAddressPin === "") emptyFields.push("PIN Code");
        if (permanentAddressState === "") emptyFields.push("State");
        if (permanentAddressArea === "") emptyFields.push("Area");
        if (roomType === "") emptyFields.push("Room Type");
        if (enteredCaptcha === "") emptyFields.push("Captcha");

        if (emptyFields.length > 0) {
            const errorMessage = "Please fill in all mandatory fields: " + emptyFields.join(", ");
            alert(errorMessage);
            return false; // Prevent form submission
        } else {
            return true; // Allow form submission
        }
    }

    // Get current date and time
    const dateTime = getCurrentDateTime();

    // Check if booking date is after the current date
    if (dateFrom <= dateTime) {
        alert("Booking date should be after the current date.");
        return false; // Prevent form submission
    }

    // Verify Captcha
    captchaVerified = verifyCaptcha();

    if (!captchaVerified || !validateFields()) {
        return false; // Prevent form submission
    }

    // Proceed with booking
    // Push data to Firebase
    ref.push({
        name: name,
        email: email,
        inst_email: inst_email,
        phone: phone,
        alt_phone: alt_phone,
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
        duration: duration,
        dateTime: dateTime
        // Add other form fields here
    }, function (error) {
        if (error) {
            alert("Error occurred while saving data: " + error.message);
        } else {
            alert("Booking Success");
        }
    });
}

function verifyCaptcha() {
    // Your captcha verification logic goes here
    if (enteredCaptcha === displayedCaptcha) {
            return true; //Allows Form Submission
        } else if (enteredCaptcha !== displayedCaptcha) {
            // Display the "Invalid Captcha" alert
            const alertTimeout = setTimeout(function() {
                alert("Invalid Captcha");
            }, 500);
            return false; // Prevent form submission
        }
}

// Function to get current date and time
function getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}