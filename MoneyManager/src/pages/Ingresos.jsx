import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'; 
import styled from "styled-components";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appFirebase from '../services/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const IngresosForm = () => {
  const categoriasIngresos = ["Salario", "Extras"];
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [MontoIngreso, setMontoIngreso] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!user) {
      setError("Por favor, inicie sesión para registrar ingresos.");
      return;
    }

    const categoria = e.target.categoriaIngresos.value;
    const monto = parseFloat(e.target.monto.value);
    const fechaObjeto = fecha ? new Date(fecha) : null; 

    if (!categoria || !descripcion || !fechaObjeto || isNaN(monto)) {
      setError("Por favor, complete todos los campos con valores válidos.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "Ingresos"), {
        categoria,
        descripcion,
        fecha: fechaObjeto,
        monto,
        timestamp: new Date()
      });
      console.log("Documento escrito con ID: ", docRef.id);
      setSuccess(true);
      alert("¡Ingreso registrado exitosamente!");
      e.target.reset();
      setDescripcion('');
      setFecha('');
      setMontoIngreso('');

    } catch (error) {
        setError("Error al registrar el ingreso. Por favor, intente nuevamente.");
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <FormCard>
        <TitleForm>Ingresos</TitleForm>
        <p>Formulario para registrar ingresos.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="categoriaIngresos" className="form-label">
              Categoría de Ingresos
            </Label>
            <select className="form-select" id="categoriaIngresos" required>
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
            <Input
              type="text"
              className="form-control"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="fecha" className="form-label">
              Fecha
            </Label>
            <Input
              type="datetime-local"
              className="form-control"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <Label htmlFor="monto" className="form-label">
              Monto
            </Label>
            <Input
              type="number"
              className="form-control"
              id="monto"
              value={MontoIngreso}
              onChange={(e) => setMontoIngreso(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Registrar Ingreso
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>Ingreso registrado exitosamente!</p>}
        </form>
      </FormCard>
    </>
  );
};
export default IngresosForm;



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
  height: auto;  /* Adjust height as needed */
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
