import React, { useState } from "react";
import styled from "styled-components";

// Componentes de formulario ficticios - reemplaza con tus componentes de formulario reales
const PresupuestoForm = () => {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState(0);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario
    console.log("Formulario de Presupuesto enviado:", {
      nombre,
      monto,
      fechaInicio,
      fechaFin,
      descripcion,
    });
    alert("Presupuesto guardado. Verifica la consola para los datos."); // Feedback
  };

  return (
    <FormCard>
      <TitleForm>Presupuesto</TitleForm>
      <p>Ingrese los detalles de su presupuesto.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label htmlFor="nombre" className="col-sm-3 col-form-label">
            Nombre del Presupuesto
          </Label>
          <div className="col-sm-9">
            <Input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <Label htmlFor="monto" className="col-sm-3 col-form-label">
            Monto ($)
          </Label>
          <div className="col-sm-9">
            <Input
              type="number"
              className="form-control"
              id="monto"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              required
              min="0"
            />
          </div>
        </div>
        <div className="row mb-3">
          <Label htmlFor="fechaInicio" className="col-sm-3 col-form-label">
            Fecha de Inicio
          </Label>
          <div className="col-sm-9">
            <Input
              type="date"
              className="form-control"
              id="fechaInicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <Label htmlFor="fechaFin" className="col-sm-3 col-form-label">
            Fecha de Fin
          </Label>
          <div className="col-sm-9">
            <Input
              type="date"
              className="form-control"
              id="fechaFin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <Label htmlFor="descripcion" className="col-sm-3 col-form-label">
            Descripción
          </Label>
          <div className="col-sm-9">
            <Textarea
              className="form-control"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="3"
            />
          </div>
        </div>
        <Button type="submit" className="btn btn-primary">
          Guardar Presupuesto
        </Button>
      </form>
    </FormCard>
  );
};


export function HomeTemplate({ activeForm }) {

  const renderForm = () => {
    switch (activeForm) {
      case "presupuesto":
        return <PresupuestoForm />;
      case "categoriaIngresos":
        return <CategoriaIngresosForm />;
      case "gastos":
        return <GastosForm />;
      case "ingresos":
        return <IngresosForm />;
      case "objetivoAhorro":
        return <ObjetivoAhorroForm />;
      default:
        return (
          <>
            <Title>
              Bienvenido a MONEY MANAGER <br />
            </Title>
            <SubText>
              MONEY MANAGER nace por las pocas aplicaciones gratis que existen para
              controlar gastos e ingresos.
              <br />
              <br /> MUCHAS GRACIAS POR APOYAR ESTE PROYECTO
            </SubText>
          </>
        );
    }
  };

  return (
    <>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveForm("presupuesto")}
                >
                  Presupuesto
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveForm("categoriaIngresos")}
                >
                  Categoría Ingresos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveForm("gastos")}
                >
                  Gastos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => setActiveForm("ingresos")}>
                  Ingresos
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveForm("objetivoAhorro")}
                >
                  Objetivo Ahorro
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveForm("usuarios")}
                >
                 
                </a>
              </li>
            </ul>
          </div>
      <Main>
        <Container>
          <InfoBox>{renderForm()}</InfoBox>
        </Container>
      </Main>
    </>
  );
}
const Main = styled.main`
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.bgtotal};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;
const Container = styled.div`
  width: 95%; /* Increased width for better responsiveness */
  max-width: 1200px; /* Added a max-width */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: center;
`;
const FormCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const TitleForm = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Textarea = styled.textarea`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color:rgb(117, 61, 103);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
const Box = styled.div`
  width: 100%; /* Make boxes take full width */
  height: auto;  /* Adjust height as needed */
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    min-height: auto; /* Adjust for smaller screens */
  }
`;
const Title = styled.h2`
  font-size: 2rem;
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  width: 100%;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;
const SubText = styled.p`
  font-size: 1.1rem;
  color: #8e8c86;
  align-self: flex-start;
  width: 100%;
  margin: 1rem auto;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
const ContainerAutor = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column; /* Stack items vertically on small screens */

  @media (min-width: 768px) {
    flex-direction: row; /* Keep horizontal layout on larger screens */
  }

  .contentImg {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem; /* Add space below image on small screens */
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .contentDescripcion {
    display: flex;
    flex-direction: column;
    text-align: center; /* Center text for small screens */
    b {
      color: ${(props) => props.theme.text};
    }
    span {
      color: #8c8c8c;
    }
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  align-self: center;
  justify-content: center;
  display: flex;
  gap: 20px;
  flex-direction: column; /* Stack buttons on small screens */

  @media (min-width: 768px) {
    flex-direction: row; /* Keep buttons in a row on larger screens */
  }
`;

const InfoBox = styled.div`
  background-color: #e0f7fa; /* Light blue background */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px; /* Add space above the box */
`;

export default HomeTemplate;
