"use client"

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
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
    // const params = useParams()
    // const session = useSession()

    const { data: project, loading, error } = useFetchData<IBlueprint | null>(`http://localhost:5555/api/blueprints/6646a2b9216d12cafa5b8dad/6646c30f7d2785a93cc930e5`);

    console.log(project)

    return (
        project && <div className="container mx-auto p-4 grid grid-cols-12 grid-rows-4 gap-4">
            <ProjectFiles title={project.title} deadline={project.deadline} />
            <Description description={project.description} author={project.creatorID} />
            <Progress progress={project.progress} />
            <Criterias criterias={project.criterias} />
        </div>
    );
}

export default ProjectPage

