import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../components/inputs';
import toast from 'react-hot-toast';
import { Lock, ArrowLeft, Loader } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import PasswordMeter from '../components/PasswordMeter';
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


const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { isLoaded, resetPassword, error, message } = useAuthStore();
    const  {token } = useParams();
    const nevigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        console.log('Token:', token);
        console.log('Password:', password);

        try {
            await resetPassword(password, token);
        } catch (error) {
            toast.error(error.message);
            return;
        }

        toast.success('Password reset successfully, Redirecting to login...');
        setTimeout(() => {
            nevigate('/login');
        }, 2000);
    }
    return (
        <motion.div
            className='max-w-sm w-full bg-gray-800/25 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-sm:w-fit '
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <motion.div className='p-8' >
                <motion.h2 variants={itemVariants}
                    className='text-3xl mb-7  font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Reset Password
                </motion.h2>
                {/* {error && <p className='text-red-500 text-center'>{error}</p>} */}
                {message && <p className='text-green-500 text-center'>{message}</p>}
                <div>
                    <p className='text-white/70 text-center text-sm pb-7'>Enter your new passowed </p>
                    <form onSubmit={handleSubmit}>
                        <motion.div variants={itemVariants}>
                            <Input
                                icno={Lock}
                                type='password'
                                placeholder='New Password'
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                icno={Lock}
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                autoComplete="current-password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </motion.div>
                        <PasswordMeter password={password} />
                        <motion.button
                            type='submit'
                            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
                            whileTap={{ scale: 0.5 }}
                            variants={itemVariants}
                            disabled={isLoaded}>
                            {isLoaded ? <Loader className='w-5 h-5  inline-block mr-1 animate-spin' /> : 'Reset Password'}
                        </motion.button>
                    </form>
                </div>

            </motion.div>


            <motion.div className='px-8 py-4 bg-gray-900/40 flex justify-center' variants={itemVariants}>
                <Link to="/login" className="text-green-500 hover:underline">
                    <ArrowLeft className='w-5 h-5 inline-block mr-1' />
                    Back to Login
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ResetPassword;