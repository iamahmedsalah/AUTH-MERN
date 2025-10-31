import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { itemVariants } from '../utils/animationVariants';

const AuthButton = ({ isLoading, type = "submit", children, disabled = false, ...props }) => {
    return (
        <motion.button
            type={type}
            className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
            whileTap={{ scale: 0.5 }}
            variants={itemVariants}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? <Loader className='mx-auto animate-spin w-6 h-5' /> : children}
        </motion.button>
    );
};

export default AuthButton;
