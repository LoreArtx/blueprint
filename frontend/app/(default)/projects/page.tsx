"use client"

import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import { useSession } from 'next-auth/react';
import React from 'react';

const ProjectsListPage = () => {
    const session = useSession()
    //@ts-ignore
    const { data, loading, error } = useFetchData<IBlueprint[] | null>("http://localhost:5555/api/blueprints/user/" + session.data?.user.id)
    //@ts-ignore
    console.log("http://localhost:5555/api/blueprints/user/" + session.data?.user.id)
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {data && data.map(blueprint => (
                    <li key={blueprint.id}>{blueprint.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsListPage;
