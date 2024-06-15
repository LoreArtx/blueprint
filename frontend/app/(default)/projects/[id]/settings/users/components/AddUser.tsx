"use client"

import { showToast } from '@/app/utils/showToast';
import { useProject } from '@/components/Providers/ProjectProvider';
import { Button, Input } from '@/components/UI';
import useFetchData from '@/hooks/useFetchData';
import useForm from '@/hooks/useForm';
import usePatchData from '@/hooks/usePatchData';
import IUser from '@/types/IUser';
import React, { useEffect, useState } from 'react'

const AddUser = () => {
    const initialValues = {
        email: ""
    }
    const { values, handleChange } = useForm(initialValues);
    const { email } = values
    const [suggestion, setSuggestion] = useState<string>("");
    const { data } = useFetchData<IUser[]>("/users");
    const { error, patchData } = usePatchData("/blueprints/update")
    const { project, updateProject } = useProject()

    useEffect(() => {
        const foundUser = data && data.filter(user => user.email === email);
        if (foundUser && foundUser.length > 0) {
            setSuggestion(foundUser[0].email);
        }
        else
            setSuggestion("");
    }, [email]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (suggestion) {
            if (project.users.includes(suggestion)) {
                showToast("error", "User is already added")
                return
            }

            const newUserList = [...project.users, suggestion]
            await patchData({ iD: project.id, users: newUserList })
            if (error) {
                showToast("error", error)
                return
            }
            showToast("success", "Added user successfully")

            updateProject({ ...project, users: newUserList })
        } else {
            showToast("error", "No user was found")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='p-2 relative shadow-lg border rounded-lg  grid grid-cols-12 gap-2'>
                <div className='absolute left-[75px] top-[11px] text-[12px] font-bold'>
                    {suggestion ? <span className='text-success'>user found</span> : email.length > 5 && <span className='text-error'>user not found</span>}
                </div>


                <div className='col-span-8'>
                    <Input
                        type="email"
                        name="email"
                        label='Email'
                        placeholder=''
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                <div className='col-span-4 flex items-center mt-[18px] min-w-[120px]'>
                    <Button type='submit' styles='h-[46px]'>Add User</Button>
                </div>
            </div>
        </form>
    );
}

export default AddUser