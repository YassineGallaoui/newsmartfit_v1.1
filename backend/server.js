const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();


// QUA SETTIAMO IL NOSTRO SERVER CON EXPRESS
const app = express();
const port = process.env.PORT || 5000;  //PORTA SU CUI ABBIAMO IL SERVER, SE NON NE ABBIAMO UNA DI DEFAULT PRENDE LA 5000
/* const buildPath = path.join('../build');
 */

// QUA SETTIAMO IL NOSTRO MIDDLEWARE
app.use(cors());
app.use(express.json());
/* app.use(express.urlencoded({ extended: true })); */

//MONGODB E MONGOOSE
const uri = process.env.ATLAS_URI;  //LINK PER IL NOSTRO DATABASE MONGODB ATLAS
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'))
connection.once('open', () => {
    console.log("Connessione al database MongoDB avvenuta con successo!")
})

//HTTP REQUEST LOGGER
const athleteRouter = require('./routes/athletes'); //DEFINISCO QUALE È LA SORGENTE DEL ROUTER DELLA SEZIONE ATLETI
const rulesRouter = require('./routes/rules'); //DEFINISCO QUALE È LA SORGENTE DEL ROUTER DELLA SEZIONE RULES
app.use('/athletes', athleteRouter);
app.use('/rules', rulesRouter);

/* if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'))
    });
} */


// Step 1:
app.use(express.static(path.resolve(__dirname, "./build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./build", "index.html"));
});


// METTIAMO IL SERVER IN ASCOLTO SULLA PORTA CHE ABBIAMO SCELTO
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})