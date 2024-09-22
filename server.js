const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'guesthouse',
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch the last Booking ID
app.get('/api/lastBookingID', async (req, res) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT bookingID FROM bookings ORDER BY bookingID DESC LIMIT 1', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
        const lastID = result[0]?.bookingID || 'BIT1000';
        const newIDNumber = parseInt(lastID.substring(3)) + 1;
        res.json({ bookingID: `BIT${newIDNumber}` });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking ID' });
    }
});

// Book a room
app.post('/api/bookings', async (req, res) => {
    const { bookingID, name, email, institute_email, phone, alt_phone, category, college_id, id_proof, id_proof_number, gender, permanent_address_location, permanent_address_pin, permanent_address_state, permanent_address_area, guestHouse, dateFrom, dateTo, duration, curr_dat_time, roomType, occupancy, bookingDate } = req.body;
    
    // Check if bookingID exists
    const existingBooking = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM bookings WHERE bookingID = ?', [bookingID], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
    
    if (existingBooking.length > 0) {
        // Generate a new booking ID
        const newBookingID = await generateNewBookingID();

        // Insert new booking with new ID
        const newBookingData = {
            bookingID: newBookingID,
            name,
            email,
            institute_email,
            phone,
            alt_phone,
            category,
            college_id,
            id_proof,
            id_proof_number,
            gender,
            permanent_address_location,
            permanent_address_pin,
            permanent_address_state,
            permanent_address_area,
            guestHouse,
            dateFrom,
            dateTo,
            duration,
            curr_dat_time,
            roomType,
            occupancy,
            bookingDate
        };

        db.query('INSERT INTO bookings SET ?', newBookingData, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Booking failed' });
            }
            res.json({ success: true, bookingID: newBookingID });
        });
    } else {
        // Insert the booking directly
        db.query('INSERT INTO bookings SET ?', req.body, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Booking failed' });
            }
            res.json({ success: true, bookingID });
        });
    }
});

// Function to generate new Booking ID
async function generateNewBookingID() {
    const result = await new Promise((resolve, reject) => {
        db.query('SELECT bookingID FROM bookings ORDER BY bookingID DESC LIMIT 1', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
    const lastID = result[0]?.bookingID || 'BIT1000';
    const newIDNumber = parseInt(lastID.substring(3)) + 1;
    return `BIT${newIDNumber}`;
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
