// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let bookings = [];

app.post('/book', (req, res) => {
    const booking = req.body;
    bookings.push(booking);
    res.status(201).send({ message: 'Cab booked successfully!', booking });
});

app.get('/bookings', (req, res) => {
    res.send(bookings);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

