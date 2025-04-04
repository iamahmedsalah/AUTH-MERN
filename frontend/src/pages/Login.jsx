import React, { useState } from 'react';
import { Lock, Mail, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Input from '../components/inputs';

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

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };


    return (
        
        <motion.div
            className='max-w-sm w-full bg-gray-800/25 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-sm:w-fit '
            initial="hidden"
            animate="visible"
            variants={containerVariants}>

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
                    <motion.button
                        type='submit'
                        className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
                        whileTap={{ scale: 0.5 }}
                        variants={itemVariants}
                        disabled={isLoaded}
                    >
                        {isLoaded ? <Loader className='mx-auto animate-spin w-6 h-5' /> : 'Login'}
                    </motion.button>
                </form>
            </div>
            <motion.div className='px-8 py-4 bg-gray-900/40 flex justify-center' variants={itemVariants}>
                <p className='text-gray-300 text-small'>
                    Don&apos;t have account?{' '}
                    <Link to={'/signup'} className='text-green-500 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </motion.div>


        </motion.div>
    );
};

export default Login;