function showBookingForm() {
    document.getElementById('rules_section').style.display = 'none';
    document.getElementById('booking_form').style.display = 'block';
}

document.getElementById('dateTo').addEventListener('change', function() {
    var dateF = new Date(document.getElementById('dateF').value);
    var dateTo = new Date(this.value);
    var duration = Math.ceil((dateTo - dateF) / (1000 * 60 * 60 * 24));

    if (duration > 3) {
        alert("You can only book for a maximum of 3 days.");
        document.getElementById('dateT').value = ''; // Clear the input field
        document.getElementById('duration').value = ''; // Clear the duration field
    } else {
        document.getElementById('duration').value = duration;
    }
});