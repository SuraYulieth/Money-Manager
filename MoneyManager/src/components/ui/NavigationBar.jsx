import React from 'react';
import Logo from '../../assets/MoneyManager.png';
import { Link, useLocation } from 'react-router-dom';

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
                <button className="nav-link btn btn-link" onClick={() => setActiveForm("presupuesto")}>
                  Presupuesto</button>
              </li>
              <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => onSelectForm("ingresos")}>
                    Ingresos</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => onSelectForm("gastos")}>
                    Gastos</button>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={() => onSelectForm("objetivoAhorro")}>
                    Ahorro</button>
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