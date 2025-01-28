const express = require('express');
const axios = require('axios');
const router = express.Router();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Endpoint do pobierania kursu waluty
router.get('/exchange-rate/:currency', async (req, res) => {
    const { currency } = req.params;

    if (currency === 'PLN') {
        return res.json({ currency: 'PLN', rate: 1.0 });
    }

    try {
        await delay(1000)
        const response = await axios.get(`http://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`);
        const rate = response.data.rates[0].mid;
        res.json({ currency, rate });
    } catch (error) {
        console.error('Błąd pobierania danych z NBP:', error.response?.data || error.message);
        res.status(500).json({ message: 'Nie udało się pobrać kursu waluty' });
    }
});


module.exports = router;
