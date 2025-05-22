import React from 'react';
import Logo from '../../assets/MoneyManager.png';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const Navbar = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const esInicio = location.pathname === "/inicio" || location.pathname === "/login" || location.pathname === "/registro";

   const handleLogout = async () => {
    const result = await Swal.fire({
    title: '¿Estás segur@?',
    text: "Cerrarás sesión y te vas a perder lo mejor 😏",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
    try {
      await signOut(getAuth());
      navigate("/inicio"); // Redirige al login o landing
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }
}

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
                <Link className="nav-link" to="/registro">Registrarse</Link>
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
              <li className='nav-item'>
                <button onClick={handleLogout} className="btn btn-outline-danger"
                  style={{ borderRadius: "0.375rem" }}>Cerrar sesión</button>
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