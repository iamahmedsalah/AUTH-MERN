import React from 'react';
import { Link } from 'react-router';
import {  motion } from 'framer-motion';
import {MagnifyingGlass} from 'react-loader-spinner';

const NotFound = () => {
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center text-white "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#b9f8cf"
      color="#016630"
  />
      <p className="text-2xl mb-8">Page Not Found</p>
      <Link to="/" className="text-green-500 hover:underline">
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;