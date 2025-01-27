const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult, query } = require('express-validator');
const router = express.Router();
const { Pool } = require('pg');

// Konfiguracja połączenia z bazą PostgreSQL
const pool = new Pool({
    user: 'user',
    host: 'db',
    database: 'mydatabase',
    password: 'password',
    port: 5432,
});

// Rejestracja użytkownika
router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Nieprawidłowy email'),
        body('password').isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków'),
        body('firstName').notEmpty().withMessage('Imię jest wymagane'),
        body('lastName').notEmpty().withMessage('Nazwisko jest wymagane'),
        body('age').isInt({ min: 1 }).withMessage('Wiek musi być liczbą większą niż 0'),
        body('nickname').notEmpty().withMessage('Pseudonim jest wymagany'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error('Błąd walidacji przy rejestracji:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, firstName, lastName, age, nickname } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await pool.query(
                'INSERT INTO users (email, password, first_name, last_name, age, nickname) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                [email, hashedPassword, firstName, lastName, age, nickname]
            );
            res.status(201).json({ message: 'Użytkownik zarejestrowany!', userId: result.rows[0].id });
        } catch (error) {
            if (error.code === '23505') {
                console.error('Email już istnieje:', email);
                return res.status(400).json({ message: 'Użytkownik z tym adresem email już istnieje!' });
            }
            console.error('Błąd serwera przy rejestracji:', error);
            res.status(500).json({ message: 'Błąd serwera' });
        }
    }
);

// Logowanie użytkownika
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Nieprawidłowy email'),
        body('password').notEmpty().withMessage('Hasło jest wymagane'),
    ],
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            if (result.rows.length === 0) {
                console.error('Nieprawidłowy email podczas logowania:', email);
                return res.status(400).json({ message: 'Nieprawidłowy email lub hasło!' });
            }

            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.error('Nieprawidłowe hasło dla użytkownika:', email);
                return res.status(400).json({ message: 'Nieprawidłowy email lub hasło!' });
            }

            const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error('Błąd serwera przy logowaniu:', error);
            res.status(500).json({ message: 'Błąd serwera' });
        }
    }
);

// Pobieranie danych użytkownika
router.get(
    '/get-profile',
    query('email').isEmail().withMessage('Nieprawidłowy email'),
    async (req, res) => {
        const { email } = req.query;

        try {
            const result = await pool.query(
                'SELECT first_name, last_name, age, nickname FROM users WHERE email = $1',
                [email]
            );
            if (result.rows.length === 0) {
                console.error('Profil nie znaleziony dla emaila:', email);
                return res.status(404).json({ message: 'Użytkownik nie został znaleziony!' });
            }
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Błąd serwera przy pobieraniu profilu:', error);
            res.status(500).json({ message: 'Błąd serwera' });
        }
    }
);

// Zmiana hasła
router.put('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            console.error('Nie znaleziono użytkownika do zmiany hasła:', email);
            return res.status(404).json({ message: 'Użytkownik nie został znaleziony!' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            console.error('Nieprawidłowe stare hasło dla użytkownika:', email);
            return res.status(400).json({ message: 'Stare hasło jest nieprawidłowe!' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);
        res.json({ message: 'Hasło zostało zaktualizowane!' });
    } catch (error) {
        console.error('Błąd serwera przy zmianie hasła:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Usuwanie konta użytkownika
router.delete('/delete-account', async (req, res) => {
    const { email } = req.body;

    try {
        const result = await pool.query('DELETE FROM users WHERE email = $1', [email]);
        if (result.rowCount === 0) {
            console.error('Nie znaleziono użytkownika do usunięcia:', email);
            return res.status(404).json({ message: 'Użytkownik nie został znaleziony!' });
        }
        res.json({ message: 'Konto zostało usunięte!' });
    } catch (error) {
        console.error('Błąd serwera przy usuwaniu konta:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Edycja danych profilowych
router.put('/edit-profile', async (req, res) => {
    const { email, firstName, lastName, age, nickname } = req.body;

    try {
        await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, age = $3, nickname = $4 WHERE email = $5',
            [firstName, lastName, age, nickname, email]
        );
        res.json({ message: 'Profil został zaktualizowany!' });
    } catch (error) {
        console.error('Błąd serwera przy edycji profilu:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Funkcja wylogowania
router.post('/logout', (req, res) => {
    try {
        res.status(200).json({ message: 'Wylogowano pomyślnie!' });
    } catch (error) {
        console.error('Błąd podczas wylogowania:', error);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

module.exports = router;