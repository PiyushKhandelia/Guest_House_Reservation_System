function showBookingForm() {
    document.getElementById('rules_section').style.display = 'none';
    document.getElementById('booking_form').style.display = 'block';
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
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

// Get current date and time when the page loads
document.getElementById('curr_date').value = getCurrentDateTime();

document.getElementById('dateTo').addEventListener('change', function() {
    var dateF = new Date(document.getElementById('dateF').value);
    var dateTo = new Date(this.value);
    var currentDate = new Date();
    
    // Check if dateTo is after dateF
    if (dateTo <= dateF) {
        alert("Check-out date should come after the Check-in date.");
        this.value = ''; // Clear the input field
        document.getElementById('duration').value = ''; // Clear the duration field
    } else {
        // Calculate duration in days
        var duration = Math.ceil((dateTo - dateF) / (1000 * 60 * 60 * 24));
        
        // Check if duration is more than 3 days
        if (duration > 3) {
            alert("You can only book for a maximum of 3 days.");
            this.value = ''; // Clear the input field
            document.getElementById('duration').value = ''; // Clear the duration field
        } else {
            document.getElementById('duration').value = duration;
        }
    }
});

document.getElementById('dateF').addEventListener('change', function() {
    var dateF = new Date(this.value);
    var currentDate = new Date();

    // Check if dateF is before the current date
    if (dateF <= currentDate) {
        alert("You can only book after the current date.");
        this.value = ''; // Clear the input field
    }
});