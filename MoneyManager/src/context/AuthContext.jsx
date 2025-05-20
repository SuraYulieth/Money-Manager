import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { appFirebase, db } from "../services/firebaseconfig";
import { getDoc, doc } from "firebase/firestore"

const auth = getAuth(appFirebase);
const AuthContext = createContext({ usuario: null });

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
       if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const datos = docSnap.data();
            setUsuario({
              uid: user.uid,
              email: user.email,
              nombre: datos.nombre || "",
              apellidos: datos.apellidos || "",
              ...datos, // si quieres otros datos como documento, montoBase, etc.
            });
          } else {
            // Usuario sin datos en Firestore, pero autenticado
            setUsuario({
              uid: user.uid,
              email: user.email,
              nombre: null,
              apellidos: null,
            });
          }
        } catch (error) {
          console.error("Error leyendo Firestore:", error);
        }
      } else {
        setUsuario(null);
      }
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
