"use client"

import React from 'react';

interface DescriptionProps {
    description: string;
}

const Description: React.FC<DescriptionProps> = ({ description }) => {
    return (
        <div className="col-span-4 row-span-1 bg-white p-4 rounded shadow">
            <div className="mb-4">
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Description;
