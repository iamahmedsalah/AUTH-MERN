import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../components/inputs';
import AuthContainer from '../components/AuthContainer';
import AuthButton from '../components/AuthButton';
import { itemVariants } from '../utils/animationVariants';
import toast from 'react-hot-toast';
import { Lock, ArrowLeft } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import PasswordMeter from '../components/PasswordMeter';

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
        <AuthContainer
            footer={
                <Link to="/login" className="text-green-500 hover:underline">
                    <ArrowLeft className='w-5 h-5 inline-block mr-1' />
                    Back to Login
                </Link>
            }
        >
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
                        <AuthButton isLoading={isLoaded}>
                            Reset Password
                        </AuthButton>
                    </form>
                </div>

            </motion.div>


        </AuthContainer>
    );
};

export default ResetPassword;