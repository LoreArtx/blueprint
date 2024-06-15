"use client"

import React from 'react';
import useForm from '@/hooks/useForm';
import { showToast } from '@/app/utils/showToast';
import usePostData from '@/hooks/usePostData';
import IBlueprint from '@/types/IBlueprint';
import { useSession } from 'next-auth/react';
import { Button, Input, Select, Textarea } from '@/components/UI';

const CreateProjectPage: React.FC = () => {
    const initialValues = {
        title: '',
        deadline: '',
        description: '',
        privacy: 'public' as 'public' | 'private'
    };

    const { values, handleChange } = useForm(initialValues);
    const { title, deadline, description, privacy } = values;
    const { error, postData } = usePostData<IBlueprint>('/blueprints/create');
    const { data: session } = useSession()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title || !deadline || !description) {
            showToast("error", "Inputs can't be empty")
            return
        }

        if (new Date() > new Date(deadline)) {
            showToast("error", "Deadline must be for at least today")
            return
        }

        if (error)
            showToast("error", error)

        values.deadline = new Date(deadline).toISOString()
        //@ts-ignore
        await postData({ ...values, creatorID: session?.user.dbID, criterias: [], users: [] })

        showToast("success", "You did it!")
    }

    return (
        <div className="container mx-auto p-4 pt-[60px]">
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-2">
                <div className='col-span-8 p-2'>
                    <Input
                        type="text"
                        label="Project Title"
                        name='title'
                        placeholder=''
                        value={title}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Description"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required />
                    <div className='grid grid-cols-2 gap-4'>
                        <Input
                            type="date"
                            name='deadline'
                            placeholder=''
                            label="Deadline"
                            value={deadline}
                            onChange={handleChange}
                            required
                        />
                        <Select
                            label="Privacy"
                            value={privacy}
                            name="privacy"
                            onChange={handleChange}
                            options={[
                                { value: 'public', label: 'Public' },
                                { value: 'private', label: 'Private' }
                            ]}
                        />
                    </div>
                </div>
                <div className='col-span-4 row-span-2 bg-white rounded shadow-lg border flex justify-center items-center'>
                    <h1 className="text-2xl font-bold">Create New Project</h1>
                </div>
                <div className='col-span-8 row-start-2'>
                    <Button type="submit">Create Project</Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProjectPage;
