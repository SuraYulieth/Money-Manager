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
          <h2 className="text-primary fw-bold mb-4">BIENVENIDO A CASH FRIEND</h2>
          <img src={Imagen1} alt="Imagen de inicio" className="img-fluid rounded shadow" />
        </div>
      
      {/* Columna de usuario */}
      <div className="col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center p-4">
              <h1 className="text-primary fw-bold display-4">Cash Friend</h1>
              <h3>Controla tu dinero y alcanza tus metas financieras</h3>
              <h3 className="text-primary">Bienvenidos</h3>
              <p>
                Esta es una herramienta para llevar un control claro y eficiente de tus ingresos, gastos y ahorros.
                Con una interfaz sencilla y funciones poderosas, te ayudamos a tomar el control de tu dinero
              </p>
            </div>
          </div>
        </div>
        </div>
        </div>
      </>
  );
};

export default Inicio;
