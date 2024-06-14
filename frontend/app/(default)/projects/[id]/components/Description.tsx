"use client"

import { useProject } from '@/components/Providers/ProjectProvider';
import React from 'react';



const Description: React.FC = () => {
    const { project } = useProject()
    return (
        <div className=" bg-white p-4 rounded shadow-lg h-full">
            <div className="mb-4">
                <p>{project.description}</p>
            </div>
        </div>
    );
};

export default Description;
