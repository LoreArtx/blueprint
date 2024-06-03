import React from 'react';
import { twMerge } from 'tailwind-merge';

const Loader = ({ styles }: { styles?: string }) => {
    const loaderStyles = twMerge("flex justify-center items-center", styles ? styles : "")
    return (
        <div className={loaderStyles}>
            <div className="flex justify-center items-center animate-spin rounded-full w-full h-full  bg-gradient-lazurite">
                <div className='h-[95%] w-[95%] rounded-full bg-milk'></div>
            </div>
        </div>
    );
};

export default Loader;
