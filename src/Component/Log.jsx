import React, { useState, useEffect } from 'react';
import auth from './firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Log = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Email Validation Function
    const isValidEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both email and password fields.");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in successfully!');
            toast.success('User registered successfully!');
        } catch (error) {
            console.error("Error during login:", error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        // This will run every time the component is loaded or re-rendered
        // setEmail('');
        // setPassword('');
    }, []);

    return (
        <>
            <main className='flex justify-center h-[100vh] items-center'>
                <form onSubmit={handleSubmit} className='justify-center flex'>
                    <section>
                        <section className='flex justify-center'>
                            <h2 className='text-[2rem]'>Welcome back</h2>
                        </section>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='hello@gmail.com'
                                className=' w-[100%] bg-red-500 block borderb'
                            />
                        </div>
                        <div className='my-[2rem]'>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=' borderb  bg-transparent'
                            />
                        </div>
                        <button type="submit" className='block py-4 px-2 bg-blue-500 w-full text-white font-semibold'>Login</button>
                    </section>
                </form>
            </main>
        </>
    );
};

export default Log;
