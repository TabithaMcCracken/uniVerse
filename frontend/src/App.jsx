import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import LoggedInPage from './pages/LoggedInPage';
import VersePage from './pages/VersePage';
import AddVersePage from './pages/AddVersePage';

// import dotenv from 'dotenv';
// dotenv.config()

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/loggedin/:userId" element={<LoggedInPage />} />
        <Route path="/verse/:id" element={<VersePage />} />
        <Route path="/add-verse/:userId" element={<AddVersePage/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;