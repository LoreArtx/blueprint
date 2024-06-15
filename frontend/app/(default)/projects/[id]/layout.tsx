//@ts-nocheck
import { options } from '@/app/api/auth/[...nextauth]/options';
import asyncFetchData from '@/app/utils/asyncFetchData';
import { ProjectProvider } from '@/components/Providers/ProjectProvider';
import IBlueprint from '@/types/IBlueprint';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface ProjectPageLayoutProps {
    params: { id: string };
}

const ProjectPageLayout = async ({ children, params }: PropsWithChildren<ProjectPageLayoutProps>) => {
    const session = await getServerSession(options);

    const data = await asyncFetchData<IBlueprint>(`/blueprints/${session && session.user.email}/${params.id}`);
    if (!data) {
        redirect('/');
    }

    return <ProjectProvider project={data} amICreator={session ? data.creatorEmail === session.user?.email : false}>
        {children}
    </ProjectProvider>;
};

export default ProjectPageLayout;
