import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Input from '../components/inputs';
import AuthContainer from '../components/AuthContainer';
import AuthButton from '../components/AuthButton';
import { itemVariants } from '../utils/animationVariants';

import {useAuthStore} from '../../store/authStore';
import toast from 'react-hot-toast'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const {login, isLoaded , error} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (error) {
        //     toast.error(error);
        //     console.log(error);
        // } 
        // if (!email || !password) {
        //     toast.error('Please fill all fields');
        //     return;
        // }
        await login(email, password);
        toast.success('Login Successfull');
        
    };


    return (
        
        <AuthContainer
            footer={
                <p className='text-gray-300 text-small'>
                    Don&apos;t have account?{' '}
                    <Link to={'/signup'} className='text-green-500 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            }
        >

            <div className='p-8' >
                <h2 className='text-3xl mb-7 font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Welcome Back
                    
                </h2>
                <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants}>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Input
                            icno={Mail}
                            type='email'
                            placeholder='Email'
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Input
                            icno={Lock}
                            type='password'
                            placeholder='Password'
                            value={password}
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </motion.div>
                    <motion.div className='flex items-center mb-3.5'
                        variants={itemVariants}>
                        <Link to='/forgot-password' className='text-sm text-green-500 hover:underline'>
                            Forgot Password ?
                        </Link>
                    </motion.div>
                    {/* {error && <motion.p  variants={itemVariants} className='text-red-500 text-center text-sm'>{error}</motion.p>} */}
                    <AuthButton isLoading={isLoaded}>
                        Login
                    </AuthButton>
                </form>
            </div>


        </AuthContainer>
    );
};

export default Login;