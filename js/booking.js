function showBookingForm() {
    document.getElementById('rules_section').style.display = 'none';
    document.getElementById('booking_form').style.display = 'block';
}

document.getElementById('dateT').addEventListener('change', function() {
    var dateF = new Date(document.getElementById('dateF').value);
    var dateT = new Date(this.value);
    var duration = Math.ceil((dateT - dateF) / (1000 * 60 * 60 * 24));

    if (duration > 3) {
        alert("You can only book for a maximum of 3 days.");
        document.getElementById('dateT').value = ''; // Clear the input field
        document.getElementById('duration').value = ''; // Clear the duration field
    } else {
        document.getElementById('duration').value = duration;
    }
});

function updateRoomOptions() {
    var guestHouse = document.getElementById('guest_house').value;
    var roomTypeSelect = document.getElementById('room_type');
    roomTypeSelect.innerHTML = ''; // Clear existing options

    if (guestHouse === 'igh') {
        // Add options for IGH Guest House
        var singleOption = document.createElement('option');
        singleOption.value = 'single';
        singleOption.textContent = 'Single';
        roomTypeSelect.appendChild(singleOption);

        var mesaninOption = document.createElement('option');
        mesaninOption.value = 'mesanin';
        mesaninOption.textContent = 'Mesanin';
        roomTypeSelect.appendChild(mesaninOption);

        var suiteOption = document.createElement('option');
        suiteOption.value = 'suite';
        suiteOption.textContent = 'Suite';
        roomTypeSelect.appendChild(suiteOption);
    } else if (guestHouse === 'ogh') {
        // Add options for OGH Guest House
        var singleOption = document.createElement('option');
        singleOption.value = 'single';
        singleOption.textContent = 'Single';
        roomTypeSelect.appendChild(singleOption);

        var suiteOption = document.createElement('option');
        suiteOption.value = 'suite';
        suiteOption.textContent = 'Suite';
        roomTypeSelect.appendChild(suiteOption);
    }
}

// Attach event listener to guest_house select element
document.getElementById('guest_house').addEventListener('change', updateRoomOptions);

// Initial call to updateRoomOptions to set initial room options
updateRoomOptions();

/*Auto Captcha*/
var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            '1','2','3','4','5','6','7','8','9','0']

var a = alpha[Math.floor(Math.random()*62)];
var b = alpha[Math.floor(Math.random()*62)];
var c = alpha[Math.floor(Math.random()*62)];
var d = alpha[Math.floor(Math.random()*62)];
var e = alpha[Math.floor(Math.random()*62)];
var f = alpha[Math.floor(Math.random()*62)];

var sum = a + b + c + d + e + f;

document.getElementById("capt").value = sum;