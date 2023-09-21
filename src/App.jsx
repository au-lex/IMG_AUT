import React, { useEffect, useState } from 'react';
import auth from './Component/firebaseAuth';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Component/Home';
import Log from './Component/Log';
import SignUP from './Component/SignUP';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);
 
    return (
        <Router>
            <ToastContainer />
            {isAuthenticated ? (
              <Home />
            ) : (
                <Routes>
                    <Route path="/login" element={<Log />} />
                    <Route path="/signup" element={<SignUP />} />
                    <Route path="*" element={<Navigate to="/login" />} /> {/* This will handle unmatched routes */}
                </Routes>
            )}
        </Router>
    );
}

export default App;
