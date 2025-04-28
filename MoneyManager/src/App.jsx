import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
//importar modulos de Firebase
import appFirebase from '../src/Credenciales'
//Para detectar estado de autenticación
import {getAuth, onAuthStateChanged} from 'firebase/auth'
//Importanción de componentes
import Login from './Components/Login'
import Home from './Components/Home'
//La autenticación es a través de appFirebase
const auth = getAuth(appFirebase)



function App() {

  const [user, setUser] = useState(null)
    onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase){
        setUser(userFirebase)
      } else {
        setUser(null)
      }
    })

  return (
    <>
      <div>
        {user ? <Home userEmail = {user.email} /> : <Login/>}
      </div> 
    </>
  )
}

export default App;
