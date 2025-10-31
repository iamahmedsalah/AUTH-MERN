import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animationVariants';

const AuthContainer = ({ children, footer }) => {
    return (
        <motion.div
            className='max-w-sm w-full bg-gray-800/25 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-sm:w-fit '
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {children}
            {footer && (
                <motion.div 
                    className='px-8 py-4 bg-gray-900/40 flex justify-center' 
                    variants={itemVariants}
                >
                    {footer}
                </motion.div>
            )}
        </motion.div>
    );
};

export default AuthContainer;
