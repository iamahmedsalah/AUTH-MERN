
import React from 'react';
import { LoaderPinwheel } from "lucide-react";

const loading = () => {

        
        return (
                
                <LoaderPinwheel
                visible={true}
                width="300"
                className='animate-spin'
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
                />
);
};

export default loading;