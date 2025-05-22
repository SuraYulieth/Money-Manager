import React, { useState } from "react";
import Imagen from "../assets/../assets/Imagen1.png";
import {appFirebase} from "../services/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/ui/NavigationBar";
import { useNavigate } from "react-router-dom";

const auth = getAuth(appFirebase);

const Login = () => {
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    try {
        await signInWithEmailAndPassword(auth, correo, contraseña);
        navigate("/home");
      } catch (error) {
        alert("El correo o la contraseña son incorrectos");
      }

}

  return(
    <>
    <Navbar/>
    <div className="container-fluid">
    <div className="row align-items-center">

      <div className="col-lg-6 mb-4 mb-lg-0 text-center">
        <img src={Imagen} alt="Imagen de inicio" className="img-fluid rounded shadow" style={{ maxWidth: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </div>

      <div className="col-lg-6">
        <div className="card shadow-lg border-0" style={{ borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body p-4">
            <h2 className="text-center mb-4" style={{ fontSize: "2rem", color: "#333" }}>
              Iniciar Sesión</h2>
              <form onSubmit={handleLogin}>
                 <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="Ingresar Email"
                      className="form-control"
                      id="email"
                      name="email"
                      required
                      style={{
                        borderRadius: "0.375rem",
                        border: "1px solid #ddd",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label"
                      style={{ fontWeight: "bold", color: "#555" }}
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      placeholder="Ingresar Contraseña"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      style={{
                        borderRadius: "0.375rem",
                        border: "1px solid #ddd",
                        padding: "0.75rem",
                      }}
                    />
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    style={{
                      borderRadius: "0.375rem",
                      padding: "0.75rem",
                      backgroundColor: "#007bff",
                      borderColor: "#007bff",
                      color: "white",
                      fontWeight: "bold",
                      display: "block",
                      width: "100%",
                      margin: "0 auto",
                      cursor: "pointer",
                    }}
                    type="submit"
                  >
                    Iniciar Sesión
                  </button>
                </form>
          <div className="text-center mt-3">
             <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
            {/*<h3 className="text-center mb-4" style={{ fontSize: '2rem', color: '#333' }}>{registrando ? "Crear Cuenta" : "Iniciar Sesión"}</h3>*/}
          </div>
        </div>
      </div>
    </div>
   </div>
   </div>
    </>
  )

}

export default Login;
