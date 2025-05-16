import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import Navbar from '../components/Navbar';
import Imagen1 from "../assets/Imagen1.png"; 
Chart.register(...registerables);

const Inicio = () => {
    const [datosEstadisticas, setDatosEstadisticas] = useState({
        labels: ['Ingresos', 'Gastos', 'Ahorros'],
        datasets: [
            {
                label: 'Resumen Financiero',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(56, 189, 248, 0.6)',
                    'rgba(247, 70, 74, 0.6)',
                    'rgba(52, 199, 89, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatosSimulados = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const ingresos = 5000;
                const gastos = 3000;
                const ahorros = 2000;

                setDatosEstadisticas({
                    labels: ['Ingresos', 'Gastos', 'Ahorros'],
                    datasets: [
                        {
                            label: 'Resumen Financiero',
                            data: [ingresos, gastos, ahorros],
                            backgroundColor: [
                                'rgba(56, 189, 248, 0.6)',
                                'rgba(247, 70, 74, 0.6)',
                                'rgba(52, 199, 89, 0.6)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                });

                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        obtenerDatosSimulados();
    }, []);

    const opciones = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Resumen Financiero',
                font: {
                    size: 20,
                },
            },
            legend: {
                position: 'bottom',
            },
        },
    };

    const renderContenido = (contenidoExtra) => (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center mb-4 mb-lg-0">
                        <h2 className="text-primary fw-bold mb-4">BIENVENIDO A CASH FRIEND</h2>
                        <img src={Imagen1} alt="Imagen de inicio" className="img-fluid rounded shadow" />
                    </div>
                    <div className="col-lg-6">
                        <div className="card shadow-lg border-0">
                            <div className="card-body text-center p-4">
                                <h1 className="text-primary fw-bold display-4">Cash Friend</h1>
                                <h3>Controla tu dinero y alcanza tus metas financieras</h3>
                                <h3 className="text-primary">Bienvenidos</h3>
                                <p>
                                    Esta es una herramienta para llevar un control claro y eficiente de tus ingresos, gastos y ahorros.
                                    Con una interfaz sencilla y funciones poderosas, te ayudamos a tomar el control de tu dinero.
                                </p>
                                {contenidoExtra}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    if (loading) {
        return renderContenido(<p>Cargando datos financieros...</p>);
    }

    if (error) {
        return renderContenido(<p className="text-danger">Error al cargar datos: {error.message}</p>);
    }

    return renderContenido(
        <div className="mt-4">
            <Bar data={datosEstadisticas} options={opciones} />
        </div>
    );
};

export default Inicio;