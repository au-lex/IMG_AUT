import React, { useState } from 'react';
import auth from './firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
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
        <main className='flex justify-center h-[100vh] items-center'>
        <form onSubmit={handleSubmit} className='justify-center flex'>
            <section>
                <section className='flex justify-center'>
                    <h2 className='text-[2rem]'>Create Account</h2>
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
                <button type="submit" className='block py-4
                 px-2 bg-blue-500 w-full text-white font-semibold'>Sign up</button>
                     <h2>Already have an account <Link to={"/sigin"}> <span className='text-red-500 font-bold'>login here</span></Link></h2>
            </section>
        </form>
    </main>
    );
};

export default SignUP;
