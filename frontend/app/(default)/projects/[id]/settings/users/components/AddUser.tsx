"use client"

import { Button, Input } from '@/components/UI';
import useForm from '@/hooks/useForm';
import React, { useEffect, useState } from 'react'

const AddUser = () => {
    const initialValues = {
        email: ""
    }
    const { values, handleChange } = useForm(initialValues);
    const { email } = values
    const [suggestion, setSuggestion] = useState<string>("");
    const users = [
        'userone@example.com',
        'usertwo@example.com',
        'userthree@example.com',
        'userfour@example.com',
        'userfive@example.com',
        'usersix@example.com',
        "fatherpother@gmail.com"
    ];

    useEffect(() => {
        const foundUser = users.filter(user => user === email);
        if (foundUser.length > 0) {
            setSuggestion(foundUser[0]);
        }
        else
            setSuggestion("");
    }, [email]);

    return (
        <form>
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
                    <Button styles='h-[46px]'>Add User</Button>
                </div>
            </div>
        </form>
    );
}

export default AddUser