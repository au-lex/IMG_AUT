import React, { useState } from 'react';
import auth from './firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const SignUP = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered successfully!');
        toast.success('User registered successfully!');
      } catch (error) {
        console.error("Error during registration:", error.message);
        toast.error(error.message);
      }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='hello@gmail.com'
                    />

                    
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>  
        </div>
    );
};

export default SignUP;
