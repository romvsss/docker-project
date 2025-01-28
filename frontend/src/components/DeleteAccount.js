import React, { useState } from 'react';
import axios from 'axios';
import '../styles/deleteAccount.css';

const DeleteAccount = () => {
    const [email, setEmail] = useState('');

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete('http://localhost:5000/auth/delete-account', { data: { email } });
            alert(response.data.message);
        } catch (error) {
            alert('Błąd usuwania konta');
        }
    };

    return (
        <div>
            <h2 className="header">Usuń konto</h2>
            <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <button className="button" onClick={handleDeleteAccount}>Usuń konto</button>
        </div>
    );
};

export default DeleteAccount;
