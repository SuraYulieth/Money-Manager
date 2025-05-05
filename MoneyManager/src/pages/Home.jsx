import { signInAnonymously, signOut, getAuth } from "firebase/auth";
import React from "react"
import appFirebase from "../services/firebaseconfig"

const auth = getAuth(appFirebase);

const Home = ({userEmail}) => {

    return (
        <>
          <div>
            <h2>Bienvenido usuario {userEmail} <button className="btn btn-primary" onClick={()=> signOut(auth)}>Logout</button></h2>
          </div> 
        </>
    )
}

export default Home;