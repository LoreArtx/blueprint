"use client"

import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ProjectsListPage = () => {
    const session = useSession()
    const pathName = usePathname()
    //@ts-ignore
    const { data, loading, error } = useFetchData<IBlueprint[] | null>("/blueprints/user/" + session.data?.user.email)
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Projects</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data && data.map(blueprint => (
                    <Link href={`${pathName}/${blueprint.id}`} key={blueprint.id}><li className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 transition">
                        <h2 className="text-xl font-semibold mb-2">{blueprint.title}</h2>
                        <p className="text-gray-700 mb-2">{blueprint.description}</p>
                        <p className="text-gray-500 text-sm">Deadline: {new Date(blueprint.deadline).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-sm">Created at: {new Date(blueprint.createdAt).toLocaleDateString()}</p>
                        <div className="mt-2">
                            <span className={`inline-block px-3 py-1 text-sm rounded-full ${blueprint.privacy === 'public' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                                {blueprint.privacy}
                            </span>
                        </div>
                    </li></Link>
                ))}
            </ul>
        </div>
    );
};

export default ProjectsListPage;
