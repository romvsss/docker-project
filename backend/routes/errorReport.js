const express = require("express");
const { Pool } = require("pg");

const router = express.Router();

// Konfiguracja połączenia z PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createReportsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        severity VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Tabela zgłoszeń została utworzona lub już istnieje.");
  } catch (err) {
    console.error("Błąd tworzenia tabeli zgłoszeń:", err);
  }
};
createReportsTable();

// Dodanie zgłoszenia
router.post("/add", async (req, res) => {
  const { description, severity } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO reports (description, severity) VALUES ($1, $2) RETURNING *",
      [description, severity]
    );
    res.status(201).json({ message: "Zgłoszenie dodane pomyślnie!", report: result.rows[0] });
  } catch (err) {
    console.error("Błąd dodawania zgłoszenia:", err);
    res.status(500).json({ message: "Wystąpił błąd podczas dodawania zgłoszenia." });
  }
});

module.exports = router;
