const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '2002', // Your MySQL password
    database: 'guesthouse' // Your MySQL database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Fetch last booking ID
app.get('/api/lastBookingID', (req, res) => {
    db.query('SELECT bookingID FROM bookings ORDER BY bookingID DESC LIMIT 1', (err, results) => {
        if (err) return res.status(500).json({ message: 'Database query failed', error: err });
        const lastID = results[0] ? results[0].bookingID : 'BIT1000';
        const newID = 'BIT' + (parseInt(lastID.slice(3)) + 1).toString();
        res.json({ bookingID: newID });
    });
});

// Generate new booking ID
const generateNewBookingID = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT bookingID FROM bookings ORDER BY bookingID DESC LIMIT 1', (err, results) => {
            if (err) return reject(err);
            const lastID = results[0] ? results[0].bookingID : 'BIT1000';
            const newID = 'BIT' + (parseInt(lastID.slice(3)) + 1).toString();
            resolve(newID);
        });
    });
};

// Handle booking submissions
app.post('/api/bookings', async (req, res) => {
    try {
        let { bookingID, ...bookingData } = req.body;

        // If bookingID is not provided, generate a new one
        if (!bookingID) {
            bookingID = await generateNewBookingID();
        } else {
            // Check if the bookingID already exists
            const existingBooking = await new Promise((resolve, reject) => {
                db.query('SELECT * FROM bookings WHERE bookingID = ?', [bookingID], (err, results) => {
                    if (err) reject(err);
                    else resolve(results);
                });
            });

            // Generate a new booking ID if it already exists
            if (existingBooking.length > 0) {
                bookingID = await generateNewBookingID();
            }
        }

        // Prepare booking data for insertion
        const newBookingData = {
            bookingID,
            name: bookingData.name,
            email: bookingData.email,
            institute_email: bookingData.institute_email,
            phone: bookingData.phone,
            alt_phone: bookingData.alt_phone,
            category: bookingData.category,
            college_id: bookingData.college_id,
            id_proof: bookingData.id_proof,
            id_proof_number: bookingData.id_proof_number,
            gender: bookingData.gender,
            permanent_address_location: bookingData.permanent_address_location,
            permanent_address_pin: bookingData.permanent_address_pin,
            permanent_address_state: bookingData.permanent_address_state,
            permanent_address_area: bookingData.permanent_address_area,
            guestHouse: bookingData.guestHouse,
            dateFrom: bookingData.dateFrom,
            dateTo: bookingData.dateTo,
            duration: bookingData.duration,
            curr_dat_time: new Date(),
            roomType: bookingData.roomType,
            occupancy: bookingData.occupancy,
            bookingDate: new Date().toISOString().split('T')[0],
            guest_house: bookingData.guest_house,
            room_type: bookingData.room_type,
        };

        // Insert booking data into the database
        await new Promise((resolve, reject) => {
            db.query('INSERT INTO bookings SET ?', newBookingData, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        res.json({ success: true, bookingID });
    } catch (error) {
        console.error('Error in booking:', error);
        res.status(500).json({ message: 'Booking failed', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});