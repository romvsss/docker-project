import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
    const [email] = useState('jan.kowalski@example.com'); // Email użytkownika (stały dla tego przykładu)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [nickname, setNickname] = useState('');

    // Bazowy URL API (czytany z .env)
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    // Pobierz dane użytkownika z backendu po załadowaniu komponentu
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/auth/get-profile`, {
                    params: { email },
                });
                console.log('Dane profilu:', response.data);
                const { first_name, last_name, age, nickname } = response.data;
                setFirstName(first_name || '');
                setLastName(last_name || '');
                setAge(age || '');
                setNickname(nickname || '');
            } catch (error) {
                console.error('Błąd podczas pobierania danych profilu:', error);
                alert('Nie udało się pobrać danych profilu.');
            }
        };

        fetchProfileData();
    }, [email, API_BASE_URL]);

    // Obsługa zapisania zaktualizowanych danych
    const handleSave = async () => {
        try {
            console.log('Wysyłanie danych do backendu:', { email, firstName, lastName, age, nickname });

            const response = await axios.put(`${API_BASE_URL}/auth/edit-profile`, {
                email,
                firstName,
                lastName,
                age,
                nickname,
            });

            console.log('Odpowiedź backendu:', response.data);
            alert(response.data.message || 'Profil został zaktualizowany!');
        } catch (error) {
            console.error('Błąd podczas aktualizacji profilu:', error.response || error);
            alert('Nie udało się zaktualizować profilu.');
        }
    };

    return (
        <div>
            <h2 className="header">Edytuj profil</h2>
            <input
                className="input"
                type="text"
                placeholder="Imię"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                className="input"
                type="text"
                placeholder="Nazwisko"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                className="input"
                type="number"
                placeholder="Wiek"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                className="input"
                type="text"
                placeholder="Pseudonim"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <button className="button" onClick={handleSave}>Zapisz</button>
        </div>
    );
};

export default EditProfile;
