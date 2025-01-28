const express = require('express');
const cors = require('cors'); // Dodaj cors
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // Import tras z pliku auth.js
const nbpRoutes = require('./routes/nbp'); // Import tras z pliku nbp.js (kursy walut)
const errorReportRoutes = require("./routes/errorReport");

// Middleware
app.use(cors()); // Dodaj cors, aby zezwolić na żądania z innego portu
app.use(express.json()); // Middleware do parsowania JSON
app.use(bodyParser.json());
// Trasy
app.use('/auth', authRoutes); // Podłączenie tras autoryzacji
app.use('/nbp', nbpRoutes); // Podłączenie tras do kursów walut
app.use('/errors', errorReportRoutes); //Podłączenie tras do raportowania błędów

// Testowa trasa
app.get('/', (req, res) => {
    res.send('Backend działa!');
});

// Obsługa błędów
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Coś poszło nie tak!' });
});

// Start serwera
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});