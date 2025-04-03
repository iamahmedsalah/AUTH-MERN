import React, { useState, useEffect } from 'react';
import { Lock, Mail, User ,Loader ,  CircleX } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Input from '../components/inputs';
import PasswordMeter from '../components/PasswordMeter';
import Preloader from '../components/loading';
import {useNavigate} from 'react-router';
import {useAuthStore} from '../../store/authStore';
import toast from 'react-hot-toast'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Loaded, setIsLoaded] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const {signup, isLoaded} = useAuthStore();
    const handleSubmitSigUp = async (e) => {
        e.preventDefault();

    try {
        await signup(username, email, password);
        navigate('/verify-email');
        }
        
    catch (error) {
        console.log('Signup Error:', error);
        toast.error(error.response.data.msg);
    }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.5,
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
            variants={containerVariants}
        >
            {Loaded ? (
                <div className='flex justify-center items-center text-center ml-24 h-96'>
                    <Preloader />
                </div>
            ) : (
                <motion.div variants={containerVariants}>
                    <motion.div className='p-8' variants={itemVariants}>
                        <h2 className='text-3xl mb-7 font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                            Create Account
                        </h2>
                        <form onSubmit={handleSubmitSigUp}>
                            <motion.div variants={itemVariants}>
                                <Input
                                    icno={User}
                                    type='text'
                                    placeholder='Username'
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
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
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <PasswordMeter password={password} />
                            </motion.div>
                            <motion.button
                                type='submit'
                                className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
                                whileTap={{ scale: 0.5 }}
                                variants={itemVariants}
                            >
                                {isLoaded ? <Loader className='mx-auto animate-spin w-6 h-5' /> : 'Sign Up'}
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div className='px-8 py-4 bg-gray-900/40 flex justify-center' variants={itemVariants}>
                        <p className='text-gray-300 text-small'>
                            Already have an account?{' '}
                            <Link to={'/login'} className='text-green-500 hover:underline'>
                                Log In
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default SignUp;