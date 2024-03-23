// Attach event listener to guest_house select element
document.getElementById('guest_house').addEventListener('change', updateRoomOptions);

// Initial call to updateRoomOptions to set initial room options
updateRoomOptions();

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

        var mezzanineOption = document.createElement('option');
        mezzanineOption.value = 'mezzanine';
        mezzanineOption.textContent = 'mezzanine';
        roomTypeSelect.appendChild(mezzanineOption);

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