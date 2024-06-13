"use client"

import React from 'react';

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
    return (
        <div className=" bg-white p-4 rounded shadow h-full">
            <div className="mb-4">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Description;
