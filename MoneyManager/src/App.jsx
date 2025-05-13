import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import appFirebase from '../src/services/firebaseconfig';
import Login from './pages/Login';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import Ingresos from './pages/Ingresos'
import Gastos from './pages/Gastos'
import Ahorro from './pages/Ahorro';
import './App.css';

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      setUser(userFirebase);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Money Manager</h1>
        </header>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>Loading...</p>
        </main>
      </div>
    );
  }

  return (
      <div className="App">

        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={user ? <Home userEmail={user.email} /> : <Navigate to="/login" />} />
            <Route path="/ingresos" element={<Ingresos />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/ahorro" element={<Ahorro/>}/>
          </Routes>
        </main>

        <footer className="App-footer text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Money Manager. All rights reserved.</p>
        </footer>
      </div>
  );
}

export default App;


