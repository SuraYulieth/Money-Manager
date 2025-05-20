import React from "react";
import { Link } from "react-router-dom"; // Importa el componente Link



const Registro = () => {
  return (
    <div className="padre">
      <div className="card card-body">
        <form>
          <input type="text" placeholder='Ingresar Nombre' className="cajatexto"/>
          <input type="email" placeholder='Ingresar Email' className="cajatexto"/>
          <input type="password" placeholder="Ingresar contraseña" className="cajatexto"/>
          <button>Crear Cuenta</button>
        </form>




        <div className="text-center mt-2">
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/login" className="btn btn-link">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;
