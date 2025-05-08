import React, { useState } from "react";
import Imagen from "../assets/ImagenInicio.jpg"
import appFirebase from "../services/firebaseconfig"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { useAuth } from "../context/AuthContext";


const auth = getAuth(appFirebase)

const Login = () => {

  const [registrando, setRegistrando] = useState(false)
  const { usuario } = useAuth();

  const functAutentication = async(e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    console.log(correo);

    if(registrando){
      try {
        const credencial = await createUserWithEmailAndPassword(auth, correo, contraseña)
        console.log("Usuario creado:", credencial.user)
        alert("usuario registrado correctamente")
      } catch (error) {
        console.error(error);
        alert(error.message);
        alert("La contraseña debe tener más de 6 caracteres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña)
      } catch (error) {
        alert("El correo o la contraseña son incorrectos")
      }
    }
  }

  return (
      <div className="row align-items-center">

        {/* Columna imagen */}
        <div className="col-lg-6 mb-4 mb-lg-0 text-center">
          <h2 className="text-primary fw-bold mb-4">BIENVENIDO A MONEY MANAGER</h2>
          <img src={Imagen} alt="Imagen de inicio" className="img-fluid rounded shadow" />
        </div>
        

        
        {/* Columna de formulario */}
        <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">{registrando ? "Crear Cuenta" : "Iniciar Sesión"}</h3>
              <form onSubmit={functAutentication}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Ingresar Email"
                    className="form-control"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    placeholder="Ingresar Contraseña"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                </div>
                <button className="btn btn-primary w-100">
                  {registrando ? "Registrarse" : "Iniciar Sesión"}
                </button>
              </form>
              <div className="text-center mt-3">
                <p className="mb-0">
                  {registrando ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => setRegistrando(!registrando)}
                  >
                    {registrando ? "Inicia Sesión" : "Regístrate"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
  );
};

export default Login;