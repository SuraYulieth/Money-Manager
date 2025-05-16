import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PerfilUsuario = () => {
  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para errores
  const [errors, setErrors] = useState({});

  // Estado para el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState('');

  // Efecto para cargar los datos del usuario almacenados (simulado)
  useEffect(() => {
    // Simulación de carga de datos desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
        setErrors({ general: 'Error al cargar los datos del usuario.' });
      }
    }
  }, []);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para validar los datos del formulario
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!userData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
      isValid = false;
    }
    if (!userData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^\S+@\S+$/.test(userData.email)) {
      newErrors.email = 'El email no es válido';
      isValid = false;
    }
    if (!userData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Función para guardar los cambios (simulado)
  const handleGuardarCambios = () => {
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify(userData));
      setIsEditing(false);
      setSuccessMessage('Perfil actualizado correctamente.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  // Función para renderizar el contenido basado en el modo de edición y los errores
  const renderContent = () => {
    if (Object.keys(errors).length > 0) {
      return (
        <div style={{ border: '1px solid #f44336', backgroundColor: '#ffebee', color: '#f44336', padding: '16px', borderRadius: '4px', margin: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '20px', height: '20px', marginRight: '8px' }}
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h2 style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Error</h2>
          </div>
          <p>
            Por favor, corrige los siguientes errores:
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </p>
        </div>
      );
    }

    if (isEditing) {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="nombre" style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Nombre</label>
            <input
              id="nombre"
              name="nombre"
              value={userData.nombre}
              onChange={handleInputChange}
              className="cajatexto"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              className="cajatexto"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              className="cajatexto"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
          </div>
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e0e0e0', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardarCambios}
              style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-4">
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Nombre:</label>
            <p style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>{userData.nombre || 'No disponible'}</p>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Email:</label>
            <p style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>{userData.email || 'No disponible'}</p>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.875rem', fontWeight: '500' }}>Contraseña:</label>
            <p style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f8f9fa' }}>********</p>
          </div>
        </div>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{ padding: '8px 16px', border: 'none', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}
          >
            Editar Perfil
          </button>
        </div>
        {successMessage && (
          <div style={{ border: '1px solid #4caf50', backgroundColor: '#f0fdf4', color: '#155724', padding: '16px', borderRadius: '4px', margin: '10px 0' }}>
            <h2 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '8px' }}>Éxito</h2>
            <p>{successMessage}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="padre" style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
      <div className="card card-body" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 className="text-2xl font-bold mb-4" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Perfil de Usuario</h1>
        {renderContent()}
        <div className="text-center mt-2" style={{ marginTop: '16px' }}>
          <Link to="/" className="btn btn-link" style={{ color: '#007bff', textDecoration: 'none' }}>
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
