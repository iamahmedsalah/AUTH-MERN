import React, { useState, useEffect } from 'react';
import { Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Input from '../components/inputs';
import PasswordMeter from '../components/PasswordMeter';
import Preloader from '../components/loading';
import AuthContainer from '../components/AuthContainer';
import AuthButton from '../components/AuthButton';
import { containerVariantsSlow, itemVariants } from '../utils/animationVariants';
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

    return (
        <AuthContainer
            footer={
                <p className='text-gray-300 text-small'>
                    Already have an account?{' '}
                    <Link to={'/login'} className='text-green-500 hover:underline'>
                        Log In
                    </Link>
                </p>
            }
        >
            {Loaded ? (
                <div className='flex justify-center items-center text-center mx-auto h-96'>
                    <Preloader />
                </div>
            ) : (
                <motion.div variants={containerVariantsSlow}>
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
                            <AuthButton isLoading={isLoaded}>
                                Sign Up
                            </AuthButton>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AuthContainer>
    );
};

export default SignUp;