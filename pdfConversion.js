const express = require('express');
const bodyParser = require('body-parser');
const pdfGenerator = require('./pdfGenerator'); // Assuming you have a module for generating PDFs

const app = express();
const port = 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handler for POST requests to /convert-to-pdf
app.post('/convert-to-pdf', async (req, res) => {
    try {
        // Assuming the request body contains data necessary for generating the PDF
        const pdfData = req.body;

        // Generate the PDF using a function from pdfGenerator module
        const pdf = await pdfGenerator.generatePDF(pdfData);

        // Send the PDF back as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
