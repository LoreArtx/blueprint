//@ts-nocheck
"use client"

import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React from 'react'
import ProjectFiles from './components/ProjectFiles';
import Description from './components/Description';
import Progress from './components/Progress';
import Criterias from './components/Criterias';

const ProjectPage = () => {
    const params = useParams()
    const session = useSession()


    const { data: project, error } = useFetchData<IBlueprint | null>(`/blueprints/${session.data?.user.dbID}/${params.id}`);
    const amICreator = project?.creatorId === session.data?.user.dbID


    return (
        project && <div className="container mx-auto p-4 grid grid-cols-12 grid-rows-8 gap-4">
            <div className='col-span-8 row-span-8'><ProjectFiles title={project.title} deadline={project.deadline} /></div>
            <div className='col-span-4 row-span-1'><Description description={project.description} /></div>
            <div className='col-span-4 row-span-1 '>{project.criterias.length > 0 && <Progress project={project} />}</div>
            <div className='col-span-4 row-span-6'><Criterias project={project} moderate={amICreator} /></div>
        </div>
    );
}

export default ProjectPage

