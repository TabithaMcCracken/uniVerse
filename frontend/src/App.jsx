import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import LoggedInPage from './pages/LoggedInPage';
import VersePage from './components/VersePage';
// import dotenv from 'dotenv';

// dotenv.config()

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/logged-in" element={<LoggedInPage />} />
        <Route path="/verse/:id" element={<VersePage />} />
      </Routes>
    </Router>
  );
};

export default App;
