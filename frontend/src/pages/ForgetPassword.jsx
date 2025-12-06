import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import Input from '../components/inputs';
import AuthContainer from '../components/AuthContainer';
import AuthButton from '../components/AuthButton';
import { itemVariants } from '../utils/animationVariants';
import { Mail,ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const [isSubmitted, setSubmitted] = useState(false);

    const { isLoaded, forgetPassword ,error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try{
            await forgetPassword(email);
            setSubmitted(true);    
        }catch {
            console.error('Error sending reset link:', error);
            toast.error(error);
        }
    
    }
    return (
        <AuthContainer
            footer={
                <Link to="/login" className="text-green-500 hover:underline">
                    <ArrowLeft   className='w-5 h-5 inline-block mr-1' />
                    Back to Login
                </Link>
            }
        >
            <motion.div className='p-8' >
                <motion.h2 variants={itemVariants}
                    className='text-3xl mb-7  font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Forget Password
                </motion.h2>
                    {!isSubmitted ? (
                                        <div>
                                        <p className='text-white/70 text-center text-sm pb-7'>Enter your email to reset your password</p>
                                        <form  onSubmit={handleSubmit}>
                                        <motion.div variants={itemVariants}>
                                            <Input
                                                icno={Mail}
                                                type='email'
                                                placeholder='Email Adress'
                                                autoComplete="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </motion.div>
                                        <AuthButton isLoading={isLoaded}>
                                            Send Reset Link
                                        </AuthButton>
                                        </form>
                                    </div>
                    ): (
                        <div className='text-center'>
                            <motion.div
                            className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{type: 'spring', stiffness: 500, damping: 30 ,duration: 0.5}}>
                            <Mail className=' h-8 w-8 text-white'/>
                            </motion.div>
                        <p className='text-white/70 text-center text-xs pb-7'>
                        If any account exists with adress<br/>{email} <br/> a reset password link will be sent to your email.
                        </p>
                    </div>
                    )}
            </motion.div>


        </AuthContainer>
    );
};

export default ForgetPassword;