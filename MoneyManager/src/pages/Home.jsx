import { signOut, getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import appFirebase from "../services/firebaseconfig";
import Imagen1 from "../assets/Imagen1.png";
import { HomeTemplate } from "../components/HomeTemplate";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/NavigationBar";


const auth = getAuth(appFirebase);

const Home = ({ userEmail }) => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState(null);

  useEffect(() => {
    if (!usuario) {
      navigate("/home");
    }
  }, [usuario, navigate]);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      alert("Cerrando sesión");
      navigate("/home");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <Navbar setActiveForm={setActiveForm} />
      <div className="container-fluid">
        <div className="row align-items-center">

          {/* Main Content */}
          <div className="row w-100 align-items-center">
            {/* Image Column */}
            <div className="col-lg-7 text-center mb-4 mb-lg-0">
              <h2 className="text-primary fw-bold mb-4">
                BIENVENIDO A MONEY MANAGER
              </h2>
              <img
                src={Imagen1}
                alt="Imagen de inicio"
                className="img-fluid rounded shadow-lg"
                style={{ borderRadius: "1rem" }}
              />
            </div>

            {/* User Column */}
            <div className="col-lg-5">
              <div className="card shadow-lg border-0"  style={{ borderRadius: "1rem" }}>
                <div className="card-body text-center p-5">
                  <h3 className="mb-4 display-6">
                    Hola, <span className="text-primary">{userEmail}</span>
                  </h3>
                  <HomeTemplate />
                  <button className="btn btn-danger w-100 py-3 fs-5" onClick={cerrarSesion}>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
