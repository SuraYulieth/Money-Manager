import React, { useState } from "react";
import Imagen from "../assets/../assets/Imagen1.png";
import {appFirebase} from "../services/firebaseconfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/ui/NavigationBar";
import { useNavigate } from "react-router-dom";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);


const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula");
  const [montoBase, setMontoBase] = useState("");
  const [errorRegistro, setErrorRegistro] = useState(null);


  const functAutentication = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    console.log(correo);

    if (registrando) {
      try {
        const credencial = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const fechaDeRegistro = new Date();
        console.log("Usuario creado:", credencial.user);

        await setDoc(doc(db, "users", credencial.user.uid), {
          nombre,
          apellidos,
          documento,
          tipoDocumento,
          fechaRegistro: fechaDeRegistro,
          montoBase: montoBase || 0,
          email: correo,
        });

        alert("Usuario registrado correctamente");
        setRegistrando(false);
      } catch (error) {
        console.error(error);
        setErrorRegistro(error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña);
        navigate("/home");
      } catch (error) {
        alert("El correo o la contraseña son incorrectos");
      }
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container-fluid">
    <div className="row align-items-center">


      <div className="col-lg-6 mb-4 mb-lg-0 text-center">
        <h2 className="text-primary fw-bold mb-4" style={{ fontSize: '2.5rem' }}>
          <span style={{ fontSize: '0.6em' }}>BIENVENIDO A FRIEND</span>
          
        </h2>
        <img src={Imagen} alt="Imagen de inicio" className="img-fluid rounded shadow" style={{ maxWidth: '100%', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </div>

      <div className="col-lg-6">
        <div className="card shadow-lg border-0" style={{ borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div className="card-body p-4">
            <h3 className="text-center mb-4" style={{ fontSize: '2rem', color: '#333' }}>{registrando ? "Crear Cuenta" : "Iniciar Sesión"}</h3>
            <form onSubmit={functAutentication}>
              {registrando && (
                <>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Nombre</label>
                    <input
                      type="text"
                      placeholder="Ingresar Nombre"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Apellidos</label>
                    <input
                      type="text"
                      placeholder="Ingresar Apellidos"
                      className="form-control"
                      id="apellidos"
                      name="apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                      style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipoDocumento" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Tipo de Documento</label>
                    <select
                      className="form-select"
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      required
                      style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem', backgroundColor: 'white' }}
                    >
                      <option value="Cedula">Cédula</option>
                      <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                      <option value="Permiso Permanencia">Permiso de Permanencia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="documento" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Documento</label>
                    <input
                      type="text"
                      placeholder="Ingresar Documento"
                      className="form-control"
                      id="documento"
                      name="documento"
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                      required
                      style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="montoBase" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Monto Base</label>
                    <input
                      type="number"
                      placeholder="Ingresar Monto Base"
                      className="form-control"
                      id="montoBase"
                      name="montoBase"
                      value={montoBase}
                      onChange={(e) => setMontoBase(e.target.value)}
                      style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}

                    />
                  </div>
                  {errorRegistro && (
                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '0.375rem', color: '#842029', backgroundColor: '#f8d7da', borderColor: '#f5c2c7' }}>
                      {errorRegistro}
                    </div>
                  )}
                </>
              )}
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="Ingresar Email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ fontWeight: 'bold', color: '#555' }}>Contraseña</label>
                <input
                  type="password"
                  placeholder="Ingresar Contraseña"
                  className="form-control"
                  id="password"
                  name="password"
                  required
                  style={{ borderRadius: '0.375rem', border: '1px solid #ddd', padding: '0.75rem' }}
                />
              </div>
              <button className="btn btn-primary w-100" style={{ borderRadius: '0.375rem', padding: '0.75rem', backgroundColor: '#007bff', borderColor: '#007bff', color: 'white', fontWeight: 'bold', display: 'block', width: '100%', margin: '0 auto', cursor: 'pointer' }}>
                {registrando ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </form>
            <div className="text-center mt-3" style={{ marginTop: '1rem' }}>
              <p className="mb-0" style={{ color: '#666' }}>
                {registrando ? "¿Ya tienes una cuenta? " : "¿No tienes una cuenta? "}
                <button
                  className="btn btn-link p-0 text-decoration-none"
                  onClick={() => setRegistrando(!registrando)}
                  style={{ color: '#007bff', textDecoration: 'underline', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  {registrando ? "Inicia Sesión" : "Regístrate"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
