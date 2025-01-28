import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ExchangeRates from './components/ExchangeRates';
import EditProfile from './components/EditProfile';
import DeleteAccount from './components/DeleteAccount';
import ChangePassword from './components/ChangePassword';
import MainSite from './components/MainSite';
import ToDoList from './components/ToDoList';
import ReportProblem from './components/ReportProblem';

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
                <Route path="/main-site" element={<MainSite />} />
                <Route path="/register" element={<AuthForm type="register" />} />
                <Route path="/login" element={<AuthForm type="login" />} />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/delete-account" element={<DeleteAccount />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/exchange-rates" element={<ExchangeRates />} />
                <Route path="/to-do-list" element={<ToDoList />} />
                <Route path="/report-problem" element={<ReportProblem />} />
            </Routes>
        </Router>
    );
};

export default App;