import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportProblem = () => {
    const [description, setDescription] = useState('');
    const [severity, setSeverity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Endpoint backendowy do dodawania zgłoszeń
        const endpoint = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/errors/add`;

        const payload = { description, severity };

        try {
            const response = await axios.post(endpoint, payload);
            alert(response.data.message || 'Zgłoszenie dodane pomyślnie!');
            // Możesz przekierować użytkownika po dodaniu zgłoszenia
            navigate('/main-site'); // Zmienna ścieżka
        } catch (error) {
            if (error.response) {
                alert('Błąd: ' + error.response.data.message);
            } else {
                // eslint-disable-next-line no-useless-concat
                alert('Błąd: ' + 'Nieznany błąd');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="header">Dodaj zgłoszenie</h2>
            <textarea
                className="input"
                placeholder="Opisz problem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select
                className="input"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                required
            >
                <option value="">Wybierz poziom ważności</option>
                <option value="niski">Niski</option>
                <option value="średni">Średni</option>
                <option value="wysoki">Wysoki</option>
            </select>
            <button type="submit" className="button">Dodaj zgłoszenie</button>
            <button type="button" className="button" onClick={() => navigate('/main-site')}>Powróć na stronę główną</button>
        </form>
    );
};

export default ReportProblem;
