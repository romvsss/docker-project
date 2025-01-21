import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/authForm.css';

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Backend endpoint URL
        const endpoint = type === 'register'
            ? `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/auth/register`
            : `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/auth/login`;

        const payload = type === 'register'
            ? { email, password, firstName, lastName, age, nickname }
            : { email, password };

        try {
            const response = await axios.post(endpoint, payload);
            alert(response.data.message || 'Zalogowano pomyślnie!');
            if (type === 'login') {
                navigate('/exchange-rates'); // Przekierowanie po zalogowaniu
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.message === 'Użytkownik z podanym adresem e-mail już istnieje.') {
                    alert('Taki użytkownik jest już zarejestrowany');
                } else {
                    alert('Błąd: ' + error.response.data.message);
                }
            } else {
                alert('Błąd: ' + (error.response?.data?.message || 'Nieznany błąd'));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2 className="header">{type === 'register' ? 'Rejestracja' : 'Logowanie'}</h2>
            {type === 'register' && (
                <>
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
                </>
            )}
            <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="input"
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="button">
                {type === 'register' ? 'Zarejestruj' : 'Zaloguj'}
            </button>
            <button type="button" className="button" onClick={() => navigate('/')}>Powróć na stronę główną</button>
        </form>
    );
};

export default AuthForm;
