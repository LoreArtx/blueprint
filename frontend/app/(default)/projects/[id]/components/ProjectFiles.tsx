"use client"

import React from 'react';
import Button from '@/components/UI/Button';
import RepositoryInfo from './RepositoryInfo';
import Link from 'next/link';
import { useProject } from '@/components/Providers/ProjectProvider';
import { usePathname } from 'next/navigation';



const ProjectFiles: React.FC = () => {
    const { project, amICreator } = useProject()
    const pathName = usePathname()
    return project &&
        <div className="bg-white p-4 rounded shadow-lg h-full">
            <div className='grid grid-cols-4 mb-4'>
                <h1 className="text-3xl font-bold col-span-2">{project.title}</h1>
                {amICreator && <div className='col-start-4'><Link href={pathName + "/settings"}><Button>Settings</Button></Link></div>}
            </div>

            <RepositoryInfo></RepositoryInfo>
        </div >
        ;
};

export default ProjectFiles;
