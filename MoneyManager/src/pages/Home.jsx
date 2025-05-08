import { signInAnonymously, signOut, getAuth } from "firebase/auth";
import React from "react"
import appFirebase from "../services/firebaseconfig"
import Imagen1 from "../assets/Imagen1.png"
import { HomeTemplate } from "../components/HomeTemplate";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const auth = getAuth(appFirebase);

const Home = ({userEmail}) => {

  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario]);

const cerrarSesion = async () => {
  try {
    await signOut(auth);
    alert("Cerrando sesión");
    navigate("/login")
    //window.location.href = "/";
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}

    return (
      <>

      <div className="container-fluid">
        <div className="row align-items-center">
          
        <div className="text-center mb-5">
          <h1 className="text-danger fw-bold">Bienvenido</h1>
        </div>

      
      {/* Contenido principal */}
      <div className="row w-100 align-items-center">
        {/* Columna de imagen */}
        <div className="col-lg-7 text-center mb-4 mb-lg-0">
          <h2 className="text-primary fw-bold mb-4">BIENVENIDO A MONEY MANAGER</h2>
          <img src={Imagen1} alt="Imagen de inicio" className="img-fluid rounded shadow" />
        </div>
      
      {/* Columna de usuario */}
      <div className="col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">
              <h3 className="mb-4">Hola, <span className="text-primary">{userEmail}</span></h3>
              <HomeTemplate/>
              <button className="btn btn-danger w-100" onClick={cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </>
       
    )

  }
      
export default Home;