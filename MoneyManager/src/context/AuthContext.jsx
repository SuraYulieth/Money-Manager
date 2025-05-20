import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appFirebase } from "../services/firebaseconfig";

const auth = getAuth(appFirebase);

const AuthContext = createContext({ usuario: null });

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const auth = getAuth(appFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácil
export const useAuth = () => useContext(AuthContext);
