import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem('user'); 
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow">
      <Link className="navbar-brand fw-bold text-white" to="/">
        Cash Friend
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/ingresos">Ingresos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/gastos">Gastos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/reportes">Informes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/perfil">Perfil</Link>
          </li>
          <li className="nav-item">
            {/* Usa un Link para la navegación */}
            <Link className="nav-link text-white" onClick={handleLogout} to="/login">Cerrar sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

