import React, { useEffect, useState } from 'react';
import auth from './Component/firebaseAuth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Home from './Component/Home';
import Log from './Component/Log';
import SignUP from './Component/SignUP';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);
    const handleLogout = async () => {
      try {
          await signOut(auth);
          console.log('Logged out successfully');
          toast.success('Logged out successfully');
      } catch (error) {
          console.error("Error during logout:", error.message);
          toast.success('User registered successfully!');
      }
  };
    return (
        <div>
            
         <ToastContainer />
            {isAuthenticated ? (
              <div>
                <Home />
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
                <div>
                    <Log />
                 
                </div>
            )}

        </div>
    );
}

export default App;
