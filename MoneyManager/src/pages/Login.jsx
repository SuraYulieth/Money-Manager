import React, { useState } from "react";
import Imagen from "../assets/ImagenInicio.jpg"
import appFirebase from "../services/firebaseconfig"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

const auth = getAuth(appFirebase)

const Login = () => {

  const [registrando, setRegistrando] = useState(false)

  const functAutentication = async(e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    console.log(correo);

    if(registrando){
      try {
        await createUserWithEmailAndPassword(auth, correo, contraseña)
      } catch (error) {
        alert("La contraseña debe tener más de 6 caracteres");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, correo, contraseña)
      } catch (error) {
        alert("El correo o la contraseña son incorrectos")
      }
    }
  }

  return (
    <div className="container">
      <div className="row">

        {/*Columna de formulario*/}
        <div className="col-md-4">
          <div className="padre">
            <div className="card card-body shadow-lg">
              <form onSubmit={functAutentication}>
                <input type="text" placeholder='Ingresar Email' className="cajatexto" id='email'/>
                <input type="password" placeholder="Ingresar contraseña" className="cajatexto" id='password'/>
                <button className="btnform">{registrando ? "Registrate" : "Inicia sesión"}</button>
              </form>
              <h4 className="texto">{registrando ? "Si ya tienes cuenta " : "No tienes cuenta "}<button className="btnswitch" onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia sesión" : "Registrate"}</button></h4>
            </div>
          </div>
        </div> 

        {/*Columna grande*/}
        <div className="col-md-8">
        <img src={Imagen} alt="" className="img-fluid"/>
        <h2 className="text-center">BIENVENIDO A MONEY MANAGER</h2>
        
        </div>


      </div>
    </div>
  );
};

export default Login;