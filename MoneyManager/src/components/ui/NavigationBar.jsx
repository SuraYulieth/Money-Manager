import React from 'react';
import Logo from '../../assets/MoneyManager.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ setActiveForm }) => {

  
  const location = useLocation();
  const esInicio = location.pathname === "/inicio" || location.pathname === "/login";

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary" style={{ backgroundColor: '#c7d2fe' }}>
    <div className="container-fluid">

      <a className="navbar-brand" href="/inicio">
        <img src={Logo} width="50px"/>
      </a>

      <div className="collapse navbar-collapse" id='navbarNav'>

        <ul className="navbar-nav ms-auto">
          {esInicio ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/home">Ingresar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/home">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/home">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ingresos">Ingresos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gastos">Gastos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/ahorro">Ahorros</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;