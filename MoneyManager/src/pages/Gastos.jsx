import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appFirebase from '../services/firebaseconfig';
import Navbar from '../components/Navbar';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const GastosForm = () => {
    const categoriasBase = ["Comida", "Transporte", "Ocio", "Otros"];
    const [categoriaGastoSeleccionada, setCategoriaGastoSeleccionada] = useState('');
    const [otraCategoriaGasto, setOtraCategoriaGasto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [monto, setMonto] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
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

    const handleCategoriaChange = (event) => {
        setCategoriaGastoSeleccionada(event.target.value);
    };

    const handleOtraCategoriaChange = (event) => {
        setOtraCategoriaGasto(event.target.value);
    };

    const handleDescripcionChange = (event) => {
        setDescripcion(event.target.value);
    };

    const handleFechaChange = (event) => {
        setFecha(event.target.value);
    };

    const handleMontoChange = (event) => {
        setMonto(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

         if (!user) {
            setError("Por favor, inicie sesión para registrar gastos.");
            return;
        }

        const categoriaFinal = categoriaGastoSeleccionada === "Otros" ? otraCategoriaGasto : categoriaGastoSeleccionada;
        const montoValue = parseFloat(monto);
        const fechaObjeto = fecha ? new Date(fecha) : null;

        if (!categoriaFinal || !descripcion || !fechaObjeto || isNaN(montoValue)) {
            setError("Por favor, complete todos los campos con valores válidos.");
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "users", user.uid, "Gastos"), {
                categoria: categoriaFinal,
                descripcion,
                fecha: fechaObjeto,
                monto: montoValue,
                timestamp: new Date()
            });
            console.log("Gasto registrado con ID: ", docRef.id);
            setSuccess(true);
            alert("¡Gasto registrado exitosamente!");
            // Limpiar el formulario
            setDescripcion('');
            setFecha('');
            setMonto('');
            setCategoriaGastoSeleccionada('');
            setOtraCategoriaGasto('');

        } catch (error) {
            console.error("Error al registrar gasto: ", error);
            setError("Error al registrar el gasto. Por favor, intente nuevamente.");
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <Navbar />
            <FormCard>
                <TitleForm>Formulario de Gastos</TitleForm>
                <p>Formulario para ingresar gastos.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Label htmlFor="descripcion" className="form-label">
                            Descripción
                        </Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            value={descripcion}
                            onChange={handleDescripcionChange}
                            required
                        />
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
                            required
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
                        <Input
                            type="datetime-local"
                            className="form-control"
                            id="fecha"
                            value={fecha}
                            onChange={handleFechaChange}
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
                            value={monto}
                            onChange={handleMontoChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="btn btn-primary">
                        Agregar Gasto
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Gasto registrado exitosamente!</p>}
                </form>
            </FormCard>
        </>
    );
};


const FormCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
`;

const TitleForm = styled.h2`
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export default GastosForm;
