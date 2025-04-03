
import React from 'react';
import { InfinitySpin } from "react-loader-spinner";

const loading = () => {

        
        return (
                
                <InfinitySpin
                visible={true}
                width="300"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
                />
);
};

export default loading;