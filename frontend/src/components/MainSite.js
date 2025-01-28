import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/mainSite.css';

const MainSite = () => {
  return (
    <div className="main-site">
      <div className="mainButtons">
        <Link to="/edit-profile">
          <button className="buttonNav">Zmień dane</button>
        </Link>
        <Link to="/delete-account">
          <button className="buttonNav">Usuń konto</button>
        </Link>
        <Link to="/change-password">
          <button className="buttonNav">Zmień hasło</button>
        </Link>
        <Link to="/" onClick={() => localStorage.removeItem('userEmail')}>
          <button className="buttonNav">Wyloguj</button>
        </Link>
      </div>
      <div className="backgroundMain">
        <h1 className="header">Wybierz apke</h1>
        <Link to="/exchange-rates">
          <button className="button">Kursy walut</button>
        </Link>
        <Link to="/exchange-rate">
          <button className="button">Przelicznik waluty</button>
        </Link>
        <Link to="/to-do-list">
          <button className="button">Lista do zrobienia</button>
        </Link>
      </div>
      <Link to="/report-problem">
          <button className="button error-report">Chcesz zgłosić problem? Daj nam znać</button>
      </Link>
    </div>
  );
};

export default MainSite;