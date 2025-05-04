import React from "react";
import Imagen from "../assets/ImagenInicio.jpg"


const Login = () => {
  return (
    <div className="container">
      <div className="row">

        {/*Columna de formulario*/}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body">
              <form>
                <input type="text" placeholder='Ingresar Email' className="cajatexto"/>
                <input type="password" placeholder="Ingresar contraseña" className="cajatexto"/>
                <button>Registrarse</button>
              </form>
            </div>
          </div>
        </div> 

        {/*Columna grande*/}
        <div className="col-md-8">
        <img src={Imagen} alt="" className="img-fluid"/>
        <h2 className="text-center">BIENVENIDO A MONEY MANAGER</h2>
        
        </div>


      </div>
    </div>
  );
};

export default Login