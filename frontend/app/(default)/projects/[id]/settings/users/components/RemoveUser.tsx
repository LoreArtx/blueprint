"use client"

import { Button, Select } from '@/components/UI';
import useForm from '@/hooks/useForm';
import React from 'react'

const RemoveUser = () => {


    const users = [
        'userone@example.com',
        'usertwo@example.com',
        'userthree@example.com',
        'userfour@example.com',
        'userfive@example.com',
        'usersix@example.com',
        "fatherpother@gmail.com"
    ];

    const selectOptions = users.map(user => ({ value: user, label: user }))

    const initialValues = {
        email: users[0]
    }

    const { values, handleChange } = useForm(initialValues)


    return (
        <div className='p-4 shadow-lg border rounded-lg grid grid-cols-12 gap-2'>
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
                <Button styles='bg-error hover:bg-error/70 h-[46px]'>Remove User</Button>
            </div>
        </div>
    )
}

export default RemoveUser