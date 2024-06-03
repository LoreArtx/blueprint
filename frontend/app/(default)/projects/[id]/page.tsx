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

    const { data: project, loading, error } = useFetchData<IBlueprint | null>(`http://localhost:5555/api/blueprints/${session.data?.user.dbID}/${params.id}`);

    console.log(project)

    return (
        project && <div className="container mx-auto p-4 grid grid-cols-12 grid-rows-4 gap-4">
            <ProjectFiles title={project.title} deadline={project.deadline} />
            <Description description={project.description} author={project.creatorID} />
            <Progress criterias={project.criterias} progress={project.progress} />
            <Criterias criterias={project.criterias} />
        </div>
    );
}

export default ProjectPage

