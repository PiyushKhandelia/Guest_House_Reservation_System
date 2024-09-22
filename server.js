const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2002',
    database: 'guesthouse',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Fetch last booking ID
app.get('/api/lastBookingID', (req, res) => {
    const sql = `SELECT bookingID FROM bookings ORDER BY bookingDate DESC LIMIT 1`;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching last booking ID:", err);
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }
        
        if (results.length > 0) {
            const lastBookingID = results[0].bookingID;
            const newBookingID = `BIT${parseInt(lastBookingID.replace('BIT', '')) + 1}`;
            res.json({ success: true, bookingID: newBookingID });
        } else {
            // If no bookings exist, start with BIT1001
            res.json({ success: true, bookingID: 'BIT1001' });
        }
    });
});

// Handle form submission
app.post('/api/bookings', (req, res) => {
    const bookingData = req.body;

    const sql = `INSERT INTO bookings (bookingID, name, email, phone, alt_phone, category, college_id, id_proof, id_proof_number, gender, permanent_address_location, permanent_address_pin, permanent_address_state, permanent_address_area, guest_house, room_type, occupancy, dateFrom, dateTo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        bookingData.bookingID,
        bookingData.name,
        bookingData.email,
        bookingData.phone,
        bookingData.alt_phone,
        bookingData.category,
        bookingData.college_id,
        bookingData.id_proof,
        bookingData.id_proof_number,
        bookingData.gender,
        bookingData.permanent_address_location,
        bookingData.permanent_address_pin,
        bookingData.permanent_address_state,
        bookingData.permanent_address_area,
        bookingData.guest_house,
        bookingData.room_type,
        bookingData.occupancy,
        bookingData.dateF,
        bookingData.dateTo
    ];    

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error inserting booking data:", err);
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }        
        res.json({ success: true, bookingID: bookingData.bookingID });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
