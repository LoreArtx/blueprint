"use client"

import React from 'react';
import Button from '@/components/UI/Button';
import RepositoryInfo from './RepositoryInfo';

interface ProjectFilesProps {
    title: string;
    deadline: string;
}

const ProjectFiles: React.FC<ProjectFilesProps> = ({ title, deadline }) => {
    return (
        <div className="col-span-8 row-span-4 bg-white p-4 rounded shadow">
            <div className='grid grid-cols-4'>
                <h1 className="text-3xl font-bold col-span-2">{title}</h1>
                {/* <div className='col-start-4 float-right'><Button>Add File</Button></div> */}
            </div>

            <RepositoryInfo></RepositoryInfo>
        </div>
    );
};

export default ProjectFiles;
