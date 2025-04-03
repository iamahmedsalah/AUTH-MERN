import { React, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {useAuthStore} from '../../store/authStore';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast'

const EmailVerification = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const {verifyEmail, error, isLoaded} = useAuthStore();


    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };



    const handleChange = (index, value) => {
        const newCode = [...code];

        // handling pasted code
        if (value.length > 1) {
            const pasteCode = value.slice(0, 6).split('');
            for (let i = 0; i < 6; i++) {
                newCode[i] = pasteCode[i] || '';
            }
            setCode(newCode);
            // focus on last filled input
            const lastfilledIndex = newCode.findLastIndex((digit) => digit !== '');
            const foucsIndex = lastfilledIndex < 5 ? lastfilledIndex + 1 : 5;
            inputRefs.current[foucsIndex].focus()
        } else {
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                inputRefs.current[index + 1].focus();

            }
        }
    }
    // move to previous input on backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index -1].focus();
        }
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join('');

        try{
            await verifyEmail(verificationCode);
            navigate('/');
            toast.success('Email verified successfully!')
        }
        catch(error){
            console.log('Verification Error:', error);
        }

    };
    useEffect(() => {
        if(code.every((digit) => digit !== '')) {
            handleSumbit(new Event('submit'));
            };
    }
        , [code]);


    return (
        <div className="max-w-sm w-full bg-gray-800/25 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-sm:w-fit">
            <motion.div className='p-8'
                initial="hidden"
                animate="visible"
                variants={containerVariants}>
                <motion.h2 variants={itemVariants} className='text-3xl mb-3.5 font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Email Verification
                </motion.h2>
                <motion.p variants={itemVariants} className="bg-clip-text text-center text-white/70 text-[10px]">Enter the 6-digt code send to your email address</motion.p>
                <form className="space-y-7">
                    <div className="flex justify-between space-x-2">
                        {code.map((digit, index) => (
                            <motion.input variants={itemVariants}
                                className="w-1/6 p-2 text-center mt-6 bg-gray-800/50 border-gray-800/20 rounded-lg drop-shadow-md
                                focus:border-emerald-500 border-2 focus:outline-none text text-emerald-500"
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength={6}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <motion.button
                        onSubmit={handleSumbit}
                        className='mt-1 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
                        whileTap={{ scale: 0.5 }}
                        variants={itemVariants}
                        disabled={isLoaded || code.some((digit) => !digit )}
                    >
                        {isLoaded ? <Loader className='mx-auto animate-spin w-6 h-5' /> : 'Verify'}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default EmailVerification;