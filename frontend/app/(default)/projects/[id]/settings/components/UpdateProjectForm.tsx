"use client"

import useForm from '@/hooks/useForm';
import { showToast } from '@/app/utils/showToast';
import { Button, Input, Select, Textarea } from '@/components/UI';
import React from 'react'
import IBlueprint from '@/types/IBlueprint';
import usePatchData from '@/hooks/usePatchData';
import { useProject } from '@/components/Providers/ProjectProvider';



const UpdateProjectForm: React.FC = () => {
    const { project } = useProject()
    const { values, handleChange } = useForm(project);
    const { title, deadline, description, privacy } = values;
    const { error, patchData } = usePatchData<IBlueprint>('/blueprints/update');
    // const { data: session } = useSession()

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
        values.deadline = new Date(deadline).toISOString()
        //@ts-ignore
        await postData({ ...values, creatorID: session?.user.dbID, criterias: [] })

        showToast("success", "You did it!")
    }

    return (
        <div className="container mx-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-3">
                <div className='col-span-8'>
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
                    <h1 className="text-2xl font-bold mb-4">Update Project</h1>
                </div>
                <div className='col-span-8 row-start-2'>
                    <Button type="submit">Update Project</Button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProjectForm