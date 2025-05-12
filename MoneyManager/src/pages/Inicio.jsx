import Navbar from "../components/ui/NavigationBar";
import Imagen1 from "../assets/Imagen1.png";
import React from "react";

const Inicio = () => {

   return(
    <>
      <Navbar/>
      <div className="container-fluid">
        <div className="row align-items-center">

        {/* Columna de imagen */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0">
          <h2 className="text-primary fw-bold mb-4">BIENVENIDO A MONEY MANAGER</h2>
          <img src={Imagen1} alt="Imagen de inicio" className="img-fluid rounded shadow" />
        </div>
      
      {/* Columna de usuario */}
      <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">
              <h4>Hola</h4>
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
  );
};

export default Inicio;
