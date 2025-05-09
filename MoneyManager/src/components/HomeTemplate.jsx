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
const CategoriaIngresosForm = () => {
  // Simulamos las opciones de categoría que vienen de la imagen
  const categorias = ["Hogar", "Alimento", "Vestimenta", "Otro"];
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [otraCategoria, setOtraCategoria] = useState('');

  const handleCategoriaChange = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handleOtraCategoriaChange = (event) => {
    setOtraCategoria(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoriaFinal = categoriaSeleccionada === "Otro" ? otraCategoria : categoriaSeleccionada;
    console.log("Categoría seleccionada:", categoriaFinal);
    // Aquí iría la lógica para guardar la categoría
  };

  return (
    <FormCard>
      <TitleForm>Formulario de Categoría de Ingresos</TitleForm>
      <p>Este es el formulario para administrar las categorías de ingresos.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label htmlFor="descripcion" className="form-label">
            Descripción
          </Label>
          <Input type="text" className="form-control" id="descripcion" />
        </div>
        <div className="mb-3">
          <Label htmlFor="nombreCategoria" className="form-label">
            Nombre Categoría
          </Label>
          <select
            className="form-select"
            id="nombreCategoria"
            value={categoriaSeleccionada}
            onChange={handleCategoriaChange}
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {categoriaSeleccionada === "Otro" && (
          <div className="mb-3">
            <Label htmlFor="otraCategoria" className="form-label">
              Otra Categoría
            </Label>
            <Input
              type="text"
              className="form-control"
              id="otraCategoria"
              value={otraCategoria}
              onChange={handleOtraCategoriaChange}
              required
            />
          </div>
        )}

        <Button type="submit" className="btn btn-primary">
          Guardar Categoría
        </Button>
      </form>
    </FormCard>
  );
};
const GastosForm = () => {
  const categoriasBase = ["Comida", "Transporte", "Ocio", "Otros"];
  const [categoriaGastoSeleccionada, setCategoriaGastoSeleccionada] = useState('');
  const [otraCategoriaGasto, setOtraCategoriaGasto] = useState('');

  const handleCategoriaChange = (event) => {
    setCategoriaGastoSeleccionada(event.target.value);
  };

  const handleOtraCategoriaChange = (event) => {
    setOtraCategoriaGasto(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoriaFinal = categoriaGastoSeleccionada === "Otros" ? otraCategoriaGasto : categoriaGastoSeleccionada;
    console.log("Categoría de Gasto:", categoriaFinal);
    // Aquí iría la lógica para guardar el gasto
  };

  return (
    <FormCard>
      <TitleForm>Formulario de Gastos</TitleForm>
      <p>Formulario para ingresar gastos.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Label htmlFor="descripcion" className="form-label">
            Descripción
          </Label>
          <Input type="text" className="form-control" id="descripcion" />
        </div>
        <div className="mb-3">
          <Label htmlFor="categoriaGastos" className="form-label">
            Categoría de Gastos
          </Label>
          <select
            className="form-select"
            id="categoriaGastos"
            value={categoriaGastoSeleccionada}
            onChange={handleCategoriaChange}
          >
            <option value="" disabled>Seleccionar categoría</option>
            {categoriasBase.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        {categoriaGastoSeleccionada === "Otros" && (
          <div className="mb-3">
            <Label htmlFor="otraCategoriaGasto" className="form-label">
              Otra Categoría de Gasto
            </Label>
            <Input
              type="text"
              className="form-control"
              id="otraCategoriaGasto"
              value={otraCategoriaGasto}
              onChange={handleOtraCategoriaChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <Label htmlFor="fecha" className="form-label">
            Fecha
          </Label>
          <Input type="datetime-local" className="form-control" id="fecha" />
        </div>
        <div className="mb-3">
          <Label htmlFor="monto" className="form-label">
            Monto
          </Label>
          <Input type="number" className="form-control" id="monto" />
        </div>
        <Button type="submit" className="btn btn-primary">
          Agregar Gasto
        </Button>
      </form>
    </FormCard>
  );
};
const IngresosForm = () => {
  const categoriasIngresos = ["Salario", "Extras"];

  return (
    <FormCard>
      <TitleForm>Ingresos</TitleForm>
      <p>Formulario para registrar ingresos.</p>
      <form>
        <div className="mb-3">
          <Label htmlFor="categoriaIngresos" className="form-label">
            Categoría de Ingresos
          </Label>
          <select className="form-select" id="categoriaIngresos">
            <option value="" disabled>Seleccionar categoría</option>
            {categoriasIngresos.map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <Label htmlFor="descripcion" className="form-label">
            Descripción
          </Label>
          <Input type="text" className="form-control" id="descripcion" />
        </div>
        <div className="mb-3">
          <Label htmlFor="fecha" className="form-label">
            Fecha
          </Label>
          <Input type="datetime-local" className="form-control" id="fecha" />
        </div>
        <div className="mb-3">
          <Label htmlFor="monto" className="form-label">
            Monto
          </Label>
          <Input type="number" className="form-control" id="monto" />
        </div>
        <Button type="submit" className="btn btn-primary">
          Registrar Ingreso
        </Button>
      </form>
    </FormCard>
  );
};

const ObjetivoAhorroForm = () => (
  <FormCard>
    <TitleForm>Objetivo de Ahorro</TitleForm>
    <p>Formulario para establecer metas de ahorro.</p>
    <form>
      <div className="mb-3">
        <Label htmlFor="fechaLimite" className="form-label">
          Fecha Limite
        </Label>
        <Input type="date" className="form-control" id="fechaLimite" />
      </div>
      <div className="mb-3">
        <Label htmlFor="montoAhorrado" className="form-label">
          Monto Ahorrado
        </Label>
        <Input type="number" className="form-control" id="montoAhorrado" />
      </div>
      <div className="mb-3">
        <Label htmlFor="montoObjetivo" className="form-label">
          Monto Objetivo
        </Label>
        <Input type="number" className="form-control" id="montoObjetivo" />
      </div>
      <div className="mb-3">
        <Label htmlFor="nombreObjetivo" className="form-label">
          Nombre del Objetivo
        </Label>
        <Input type="text" className="form-control" id="nombreObjetivo" />
      </div>
      <Button type="submit" className="btn btn-primary">
        Guardar Objetivo
      </Button>
    </form>
  </FormCard>
);


export function HomeTemplate() {
  const [activeForm, setActiveForm] = useState(null);

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
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={() => setActiveForm(null)}>
            Money Manager
          </a>
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
        </div>
      </nav>
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
