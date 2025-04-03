import { Check, X } from 'lucide-react';
import React from 'react';

import { motion } from 'framer-motion';


const PasswordCriteria = ({password}) => {

    const criteria = [
        {label: 'Minimum 6 Characters', met: password.length >= 6}, 
        {label:'Contains Uppercase Letter', met: /[A-Z]/.test(password)},
        {label:'Contains Lowercase Letter', met: /[a-z]/.test(password)},
        {label:'Contains Number', met: /[0-9]/.test(password)},
        {label:'Contains Special Character', met: /[^A-Za-z0-9]/.test(password)},
    ]

    return (
        <div className='mt-2 space-y-1'>
            {criteria.map((items) => (
                <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: items.met ? 1 : 0.5, x: items.met ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                key={items.label} className='flex items-center text-xs'>
                    {items.met ? (
                        <Check
                        className='w-4 h-4 mr-2 text-green-500' />
                    ) : (
                        <X className='w-4 h-4 mr-2 text-gray-500' />
                    )}
                    <span className={items.met ? 'text-green-500' : 'text-gray-500'}> 
                        {items.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );

}

const PasswordMeter = ({password}) => {

    const getStrength = (pass) => {
        let strength = 0;
        if(pass.length >= 6) strength ++;
        if(pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength ++;
        if(pass.match(/[0-9]/)) strength ++;
        if(pass.match(/[^A-Za-z0-9]/)) strength ++;
        return strength;
        
    }
    const strength = getStrength(password);

    const getStrengthGrade = (strength) => {
        switch(strength) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Strong';
            default:
                return '';
        }
    }

    const getStrengthColor = (strength) => {
        switch(strength) {
            case 0:
                return 'bg-red-700/70';
            case 1:
                return 'bg-red-700/70';
            case 2:
                return 'bg-yellow-500/70';
            case 3:
                return 'bg-green-500/70';
            default:
                return '';
        }
    }



    return (
        <div className='mt-2'>
            <div className='flex justify-between items-center mb-1'>
                <span className='text-xs text-gray-400'>Password Strength</span>
                <span className='text-xs text-gray-400'>{getStrengthGrade(strength)}</span>
            </div>
            <div className=' flex space-x-1'>
            {[...Array(4)].map((_, index) => (
                <div key={index} className={`h-1 w-1/4 rounded-full transition-color duration-300
                ${index < strength ? getStrengthColor(strength) : 'bg-gray-500'}`}></div>
            ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordMeter;