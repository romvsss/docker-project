import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ExchangeRates from './components/ExchangeRates';
import EditProfile from './components/EditProfile';
import DeleteAccount from './components/DeleteAccount';
import ChangePassword from './components/ChangePassword';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="backgroundMain">
                            <h1 className="header">Witamy w naszej aplikacji</h1>
                            <Link to="/login">
                                <button className="buttonStart">Zaloguj</button>
                            </Link>
                            <Link to="/register">
                                <button className="buttonStart">Zarejestruj</button>
                            </Link>
                        </div>
                    }
                />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route
                    path="/exchange-rates"
                    element={
                        <div>
                            <div className='mainButtons'>
                                <Link to="/edit-profile">
                                    <button className='button'>Zmień dane</button>
                                </Link>
                                <Link to="/delete-account">
                                    <button className='button'>Usuń konto</button>
                                </Link>
                                <Link to="/change-password">
                                    <button className='button'>Zmień hasło</button>
                                </Link>
                                <Link to="/">
                                    <button className='button'>Wyloguj</button>
                                </Link>
                            </div>
                            <ExchangeRates />
                        </div>
                    }
                />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/delete-account" element={<DeleteAccount />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </Router>
    );
};

export default App;