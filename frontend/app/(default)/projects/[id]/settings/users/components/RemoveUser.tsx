"use client"

import { showToast } from '@/app/utils/showToast';
import { useProject } from '@/components/Providers/ProjectProvider';
import { Button, Select } from '@/components/UI';
import useForm from '@/hooks/useForm';
import usePatchData from '@/hooks/usePatchData';
import React from 'react'

const RemoveUser = () => {
    const { project, updateProject } = useProject()
    const { error, patchData } = usePatchData("/blueprints/update")

    const users = project.users;
    const selectOptions = users.map(user => ({ value: user, label: user }))
    const initialValues = {
        email: users[0]
    }

    const { values, handleChange } = useForm(initialValues)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newUserList = project.users.filter(u => u !== values.email)
        await patchData({ iD: project.id, users: newUserList })
        if (error) {
            showToast("error", error)
            return
        }
        showToast("success", "User was deleted")
        updateProject({ ...project, users: newUserList })
    }


    return (
        <form onSubmit={handleSubmit} className='p-4 shadow-lg border rounded-lg grid grid-cols-12 gap-2'>
            <div className='col-span-8'>
                <Select
                    label="Students"
                    value={values.email}
                    name="email"
                    onChange={handleChange}
                    options={selectOptions}
                />
            </div>
            <div className='col-span-4 flex items-center mt-[18px] min-w-[120px]'>
                <Button type='submit' styles='bg-error hover:bg-error/70 h-[46px]'>Remove User</Button>
            </div>
        </form>
    )
}

export default RemoveUser