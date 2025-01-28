import React, { useState } from 'react';
import axios from 'axios';
import '../styles/exchangeRate.css';

const ExchangeRate = () => {
    const [currency, setCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/nbp/exchange-rate/${currency}`);
            setExchangeRate(response.data.exchangeRate);
        } catch (error) {
            alert('Błąd pobierania kursu walut');
        }
    };

    return (
        <div>
            <h2 className="header">Kurs walut</h2>
            <input
                className="input"
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                placeholder="Podaj kod waluty (np. DKK)"
            />
            <button className="button" onClick={fetchExchangeRate}>Sprawdź kurs</button>
            {exchangeRate && <p>Kurs {currency}: {exchangeRate} PLN</p>}
        </div>
    );
};

export default ExchangeRate;
