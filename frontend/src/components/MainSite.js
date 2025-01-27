import React from 'react';
import { Link } from 'react-router-dom';

const MainSite = () => {
  return (
    <div className="main-site">
      <div className="mainButtons">
        <Link to="/edit-profile">
          <button className="button">Zmień dane</button>
        </Link>
        <Link to="/delete-account">
          <button className="button">Usuń konto</button>
        </Link>
        <Link to="/change-password">
          <button className="button">Zmień hasło</button>
        </Link>
        <Link to="/" onClick={() => localStorage.removeItem('userEmail')}>
          <button className="button">Wyloguj</button>
        </Link>
      </div>
      <div className="backgroundMain">
        <h1 className="header">Wybierz apke</h1>
        <Link to="/exchange-rates">
          <button className="button">Kursy walut</button>
        </Link>
        <Link to="/to-do-list">
          <button className="button">Lista do zrobienia</button>
        </Link>
      </div>
    </div>
  );
};

export default MainSite;