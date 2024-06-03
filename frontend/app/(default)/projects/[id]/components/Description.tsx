"use client"

import React from 'react';

interface DescriptionProps {
    description: string;
    author: string;
}

const Description: React.FC<DescriptionProps> = ({ description, author }) => {
    return (
        <div className="col-span-4 row-span-1 bg-white p-4 rounded shadow">
            <div className="mb-4">
                <p>{description}</p>
                <p>by: {author}</p>
            </div>
        </div>
    );
};

export default Description;
