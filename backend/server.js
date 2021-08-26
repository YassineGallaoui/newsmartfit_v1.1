const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


require('dotenv').config();


// SETTIAMO SERVER CON EXPRESS
const app = express();
const port = process.env.PORT || 5000;

// SETTIAMO MIDDLEWARE
app.use(cors());
app.use(express.json());

// MONGODB E MONGOOSE
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
    console.log("Connessione al database MongoDB avvenuta con successo!")
})

// HTTP REQUEST LOGGER
const athleteRouter = require('./routes/athletes');
const rulesRouter = require('./routes/rules');
app.use('/athletes', athleteRouter);
app.use('/rules', rulesRouter);

// FOR PRODUCTION:
// Step 1:
/* app.use(express.static(path.resolve(__dirname, "./build"))); */
// Step 2:
/* app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./build", "index.html"));
}); */

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/athletes', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    app.get('/rules', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}


// METTIAMO SERVER IN ASCOLTO SULLA PORTA
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})