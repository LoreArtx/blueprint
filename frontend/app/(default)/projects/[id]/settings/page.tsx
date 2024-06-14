"use client"

import React from 'react';

// import usePostData from '@/hooks/usePostData';
import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import UpdateProjectForm from './components/UpdateProjectForm';

const ProjectSettingsPage: React.FC = () => {

    const params = useParams()
    const session = useSession()
    //@ts-ignore
    const { data: project, error } = useFetchData<IBlueprint | null>(`/blueprints/${session.data?.user.dbID}/${params.id}`);

    return project && <UpdateProjectForm project={project} />;
};

export default ProjectSettingsPage;
