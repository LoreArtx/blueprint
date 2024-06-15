"use client"

import React, { useState } from 'react';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { useProject } from '@/components/Providers/ProjectProvider';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/UI';
import useFetchData from '@/hooks/useFetchData';
import IFile from '@/types/IFile';
import FileList from './FileList';
import { useSession } from 'next-auth/react';

const ProjectFiles: React.FC = () => {
    const { project, amICreator } = useProject();
    const { data: session } = useSession()
    const pathName = usePathname();
    const [selectedFiles, setSelectedFiles] = useState<Array<{ name: string, url: string }>>([
        { name: "example1.txt", url: "/path/to/example1.txt" },
        { name: "example2.pdf", url: "/path/to/example2.pdf" }
    ]);

    const { data } = useFetchData<IFile[]>("/files/" + project.id)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));
            setSelectedFiles([...selectedFiles, ...newFiles]);
        }
    };

    return project && (
        <div className="bg-white p-4 rounded shadow-lg h-full">
            <div className='grid grid-cols-4 mb-4'>
                <h1 className="text-3xl font-bold col-span-2">{project.title}</h1>
                {amICreator && <div className='col-start-4'><Link href={pathName + "/settings"}><Button>Settings</Button></Link></div>}
            </div>
            <div className='flex items-center gap-4 mb-4'>
                <div>
                    <span className={`inline-block px-3 py-1 text-sm rounded-full ${project.privacy === 'public' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {project.privacy}
                    </span>
                </div>

                <div><p className="text-gray-500 text-sm">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                    <p className="text-gray-500 text-sm">Created at: {new Date(project.createdAt).toLocaleDateString()}</p></div>
            </div>

            {(amICreator || project.users.includes(session?.user?.email)) && <div className='border-2 p-2 '>
                <Input
                    type="file"
                    label="Upload Files"
                    value=""
                    name="fileUpload"
                    placeholder=""
                    onChange={handleFileChange}
                />
            </div>}
            <div>
                <h2 className="text-2xl mt-4">Uploaded Files</h2>
                {data && <FileList data={data} />}
            </div>
        </div>
    );
};

export default ProjectFiles;
