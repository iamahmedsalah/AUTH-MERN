import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore} from '../../store/authStore';
import { UserCircle } from 'lucide-react';
import toast from 'react-hot-toast'

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


const Home = () => {
    const formater = (dataString)=>{
        const date = new Date(dataString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' ,hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    }

    const {user, logout} = useAuthStore();

    
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            toast.success('Logout successful');
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout failed', error);
            toast.error('Logout failed');
        }
    }

    return (
        <motion.div
            className='max-w-sm w-full bg-gray-800/25 backdrop-filter backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden max-sm:w-fit '
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <motion.div className='p-5' >
                <motion.h2 variants={itemVariants}
                className='text-3xl mb-7  font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Profile 
                    <UserCircle className='w-10 h-10 text-green-400 mx-auto mt-1.5' />
                </motion.h2> 
                <motion.div  className='px-2 py-4 bg-gray-900/40 flex-col justify-center backdrop-blur-sm rounded-2xl' variants={itemVariants}>
                    <p className='text-green-400'>Name: <span className=' text-white/70'>{user.name}</span></p>
                    <p  className='text-green-400'>Email: <span className=' text-white/70'>{user.email}</span></p>
                </motion.div>
            </motion.div>
            <motion.div className='p-5' >
                <motion.h2 variants={itemVariants}
                className='text-xl mb-3  font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
                    Account Activity 
                </motion.h2> 
                <motion.div  className='text-center py-4 bg-gray-900/40 flex-col justify-center backdrop-blur-sm rounded-2xl' variants={itemVariants}>
                    <p className='text-green-400'>Joined: <span className=' text-white/70'>{
                        new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                    }</span></p>
                    <p className='text-green-400'>Last Login: <span className=' text-white/70'>{formater(user.lastLogin)}</span></p>
                </motion.div>
            </motion.div>
            <motion.div className='px-8 py-4 bg-gray-900/40 flex justify-center' variants={itemVariants}>
            <motion.button
                        type='submit'
                        onClick={handleLogout}
                        className='mt-5  py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-700 rounded-lg text-white font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none cursor-pointer transition-all duration-200'
                        whileTap={{ scale: 0.5 }}
                        variants={itemVariants}
                        
                    >
                        Logout
                    </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default Home;