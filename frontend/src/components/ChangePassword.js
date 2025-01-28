import React, { useState } from 'react';
import axios from 'axios';
import '../styles/changePassword.css';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async () => {
        try {
            const response = await axios.put('http://localhost:5000/auth/change-password', {
                currentPassword,
                newPassword,
            });
            alert(response.data.message);
        } catch (error) {
            alert('Błąd podczas zmiany hasła.');
        }
    };

    return (
        <div>
            <h2 className="header">Zmień hasło</h2>
            <input
                className="input"
                type="password"
                placeholder="Obecne hasło"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
                className="input"
                type="password"
                placeholder="Nowe hasło"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className="button" onClick={handleChangePassword}>Zmień hasło</button>
        </div>
    );
};

export default ChangePassword;
