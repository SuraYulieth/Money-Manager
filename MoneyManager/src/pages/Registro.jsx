import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/NavigationBar";
import Imagen from "../assets/Imagen1.png";
import { appFirebase } from "../services/firebaseconfig";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Registro = () => {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("Cedula");
  const [documento, setDocumento] = useState("");
  const [montoBase, setMontoBase] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorRegistro, setErrorRegistro] = useState(null);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErrorRegistro(null);

    try {
      // Validar si ya existe el documento
      const consulta = query(collection(db, "users"), where("documento", "==", documento));
      const resultado = await getDocs(consulta);
      if (!resultado.empty) {
        setErrorRegistro("Ya existe un usuario con ese documento.");
        return;
      }

      const credencial = await createUserWithEmailAndPassword(auth, email, password);
      const fechaDeRegistro = new Date();

      await setDoc(doc(db, "users", credencial.user.uid), {
        nombre,
        apellidos,
        tipoDocumento,
        documento,
        montoBase: montoBase || 0,
        email,
        fechaRegistro: fechaDeRegistro,
      });

      alert("Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorRegistro("Este correo ya está registrado.");
      } else {
        setErrorRegistro(error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-0 mb-lg-0 text-center">
           <div className="text-center mb-5 p-3"><div className="col">
              <h1 style={{ fontWeight: 'bold' }}>Bienvenido a Cash Friend</h1></div></div>
            <div>
            <img
              src={Imagen}
              alt="Imagen de registro"
              className="img-fluid rounded shadow"
              style={{
                maxWidth: "100%",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            </div>
          </div>

          <div className="col-lg-6 p-2">
            <div className="card shadow-lg border-0" style={{ borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <div className="card-body p-5">
                <h3 className="text-center mb-3" style={{ fontSize: "2rem", color: "#333" }}>
                  Crear Cuenta
                </h3>

                <form onSubmit={handleRegistro}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                    <input type="text" className="form-control" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento</label>
                    <select className="form-select" id="tipoDocumento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} required>
                      <option value="Cedula">Cédula</option>
                      <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                      <option value="Permiso Permanencia">Permiso de Permanencia</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="documento" className="form-label">Documento</label>
                    <input type="text" className="form-control" id="documento" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="montoBase" className="form-label">Monto Base</label>
                    <input type="number" className="form-control" id="montoBase" value={montoBase} onChange={(e) => setMontoBase(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>

                  {errorRegistro && (
                    <div className="alert alert-danger" role="alert">
                      {errorRegistro}
                    </div>
                  )}

                  <button type="submit" className="btn btn-success w-100">
                    Registrarse
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}


export default Registro;
