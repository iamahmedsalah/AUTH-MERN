import React from 'react';
import { Link } from 'react-router';
import {  motion } from 'framer-motion';
import {ShieldX } from 'lucide-react';

const NotFound = () => {
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center text-white "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <ShieldX className='w-20 h-20 mb-4' />
      <p className="text-2xl mb-8">Oops! Page not found.</p>
      <Link to="/" className="text-green-500 hover:underline">
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;