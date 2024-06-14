
"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
import Image from 'next/image';
import Loader from "@/UI/Loader"

import { useEffect } from 'react';
import useForm from '@/hooks/useForm';

const ProfilePage: React.FC = () => {
    const { data: session } = useSession();
    const { user } = session
    const { values: userInfo, handleChange, setFormValues } = useForm({
        name: '',
        email: '',
        image: '',
    });

    useEffect(() => {
        const { user } = session;
        setFormValues({
            name: user.name,
            email: user.email,
            image: user.image || '',
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="grid grid-cols-12 mt-[45px] flex-auto">
            <div className="col-start-1 col-end-2">
                <div className='absolute flex justify-center items-center w-[307px] h-[307px] rounded-full bg-gradient-lazurite'>
                    <Image src={user.image} width={300} height={300} className="rounded-full" alt="Profile Image" />
                </div>
            </div>
            <div className="col-start-5 col-end-12">
                <form onSubmit={handleSubmit} className="space-y-4 grid-rows-4">
                    {userInfo.email ? <>
                        <Input
                            type="text"
                            label="Name"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            placeholder="Name"
                            styles="row-span-1"
                        />
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={userInfo.email}
                            placeholder="Email"
                            onChange={handleChange}
                            disabled
                            styles="row-span-1"
                        />
                        <Input
                            type="text"
                            label="Image URL"
                            name="image"
                            value={userInfo.image}
                            placeholder="Image URL"
                            onChange={handleChange}
                            disabled
                            styles="row-span-1"
                        /></> : <div className='w-full flex justify-center'><Loader styles="row-span-3 w-[100px] h-[100px]" /></div>}
                    <Button type="submit">Update Profile</Button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
