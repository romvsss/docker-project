import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/exchangeRates.css';

const ExchangeRates = () => {
    const [rates, setRates] = useState([]);
    const currencies = ['USD', 'EUR', 'PLN', 'CAD', 'DKK'];

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const fetchedRates = await Promise.all(
                    currencies.map(async (currency) => {
                        try {
                            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/nbp/exchange-rate/${currency}`);
                            return { currency, rate: response.data.rate };
                        } catch (error) {
                            console.warn(`Brak danych dla waluty ${currency}:`, error.response?.data?.message || error.message);
                            return { currency, rate: 'Brak danych' }; // Zwracaj informację o braku danych
                        }
                    })
                );
                setRates(fetchedRates);
            } catch (error) {
                console.error('Błąd podczas pobierania kursów walut:', error);
            }
        };


        fetchRates();
    },);

    return (
        <div class="container">
            <h2 class="heading">Kursy Walut</h2>
            <table class="table">
                <thead class="table-head">
                    <tr>
                        <th>Waluta</th>
                        <th>Kurs</th>
                    </tr>
                </thead>
                <tbody class="table-body">
                    {rates.map((rate) => (
                        <tr key={rate.currency}>
                            <td class="table-cell">{rate.currency}</td>
                            <td class="table-cell">{rate.rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExchangeRates;
