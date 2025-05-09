import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import appFirebase from '../src/services/firebaseconfig'; // Corrected import path
import Login from './pages/Login'; // Corrected import path
import Home from './pages/Home';   // Corrected import path
import './App.css'; // Import CSS for global styles

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      setUser(userFirebase);
      setLoading(false); // Set loading to false once auth state is determined
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Show a loading indicator while checking auth state
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Money Manager</h1>
        </header>
        <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <p>Loading...</p> 
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
       <div className="logo-container">
            {/* Important:  Place Logo_MoneyManager.jpg in the public/assets folder */}
            <img
              src="/assets/Logo_MoneyManager.jpg"  // Corrected path for public folder
              alt="Money Manager"
              style={{ maxHeight: '50px' }}
            />
          </div>
      </header>
      <main className="container mx-auto p-4">
        {user ? <Home userEmail={user.email} /> : <Login />}
      </main>
       <footer className="App-footer text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Money Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

