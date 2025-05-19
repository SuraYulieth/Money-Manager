import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import appFirebase from '../services/firebaseconfig';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const Informes = () => {
    const [informe, setInforme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            if (!currentUser) {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        const generarInforme = async () => {
            if (!user) {
                setLoading(false);
                setError("Usuario no autenticado");
                return;
            }

            try {
                const ingresosRef = collection(db, "users", user.uid, "Ingresos");
                const gastosRef = collection(db, "users", user.uid, "Gastos");

                const ingresosSnapshot = await getDocs(ingresosRef);
                const gastosSnapshot = await getDocs(gastosRef);

                let totalIngresos = 0;
                let totalGastos = 0;
                const ingresosData = [];
                const gastosData = [];

                ingresosSnapshot.forEach(doc => {
                    const data = doc.data();
                    totalIngresos += data.monto;
                     ingresosData.push({
                        ...data,
                        fecha: data.fecha ? data.fecha.toDate() : null, // Convertir Timestamp a Date
                    });
                });

                gastosSnapshot.forEach(doc => {
                    const data = doc.data();
                    totalGastos += data.monto;
                    gastosData.push({
                        ...data,
                        fecha: data.fecha ? data.fecha.toDate() : null,  // Convertir Timestamp a Date
                    });
                });

                const balance = totalIngresos - totalGastos;

                setInforme({
                    totalIngresos,
                    totalGastos,
                    balance,
                    ingresos: ingresosData,
                    gastos: gastosData
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            generarInforme();
        }
    }, [user]);

    if (loading) {
        return (
            <Main>
                <Container>
                    <p>Cargando informe...</p>
                </Container>
            </Main>
        );
    }

    if (error) {
       return (
            <Main>
                <Container>
                    <p>Error: {error}</p>
                </Container>
            </Main>
        );
    }

    if (!informe) {
        return (
            <Main>
                <Container>
                    <p>No hay información para generar el informe.</p>
                </Container>
            </Main>
        );
    }

    const { totalIngresos, totalGastos, balance, ingresos, gastos } = informe;

    return (
        <>
            <Navbar/>
            <Main>
                <Container>
                    <Title>Informe Financiero</Title>
                    <InformeCard>
                        <InformeTitulo>Resumen</InformeTitulo>
                        <p>Total de Ingresos: ${totalIngresos.toFixed(2)}</p>
                        <p>Total de Gastos: ${totalGastos.toFixed(2)}</p>
                        <p>Balance: ${balance.toFixed(2)}</p>
                    </InformeCard>

                    <InformeCard>
                        <InformeTitulo>Detalle de Ingresos</InformeTitulo>
                        {ingresos.length > 0 ? (
                            <ul>
                                {ingresos.map((ingreso, index) => (
                                    <li key={index}>
                                        Categoría: {ingreso.categoria}, Descripción: {ingreso.descripcion}, Monto: ${ingreso.monto.toFixed(2)}, Fecha: {ingreso.fecha?.toLocaleDateString() || 'No disponible'}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay ingresos registrados.</p>
                        )}
                    </InformeCard>

                    <InformeCard>
                        <InformeTitulo>Detalle de Gastos</InformeTitulo>
                        {gastos.length > 0 ? (
                            <ul>
                                {gastos.map((gasto, index) => (
                                    <li key={index}>
                                        Categoría: {gasto.categoria}, Descripción: {gasto.descripcion}, Monto: ${gasto.monto.toFixed(2)}, Fecha: {gasto.fecha?.toLocaleDateString() || 'No disponible'}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay gastos registrados.</p>
                        )}
                    </InformeCard>
                </Container>
            </Main>
        </>
    );
};

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
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding-bottom: 2rem;
`;

const Title = styled.h2`
    font-size: 2rem;
    color: ${(props) => props.theme.text};
    margin-bottom: 2rem;
    width: 100%;
    text-align: center;
`;

const InformeCard = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
`;

const InformeTitulo = styled.h3`
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
`;


export default Informes;
