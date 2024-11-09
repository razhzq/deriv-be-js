const express = require('express'); // Import express module
const cors = require('cors'); // Import cors middleware
const { getAllSymbols, getBrokerExposure } = require('./controller/asset.controller');
const app = express(); // Initialize express app
const port = 8080; // Set the port number

// Enable CORS for all origins
app.use(cors({
    origin: "*"
}));

// Middleware to handle JSON requests
app.use(express.json());

// Route for the home page (GET request)
app.get('/', (req, res) => {
    res.send('Hello, world!'); // Sends a simple message as response
});

app.get('/symbols', getAllSymbols);

app.post('/riskexposure', getBrokerExposure);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
