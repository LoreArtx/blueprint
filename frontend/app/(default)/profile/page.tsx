//@ts-nocheck
"use client"

import React from 'react';
import { useSession } from 'next-auth/react';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
import Image from 'next/image';
import Loader from "@/UI/Loader"
import useForm from '@/hooks/useForm';
import usePatchData from '@/hooks/usePatchData';
import { showToast } from '@/app/utils/showToast';

const ProfilePage: React.FC = () => {
    const { data: session, update } = useSession();
    const { user } = session
    const { values, handleChange } = useForm({
        name: user.name,
        image: user.image,
        email: user.email
    });


    const { error, patchData } = usePatchData("/users/update")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (values.email !== user.email || !values.name || !values.image) {
            showToast("error", "Inputs can't be empty")
            return
        }

        await patchData({ iD: user.dbID, ...values })

        if (error) {
            showToast("error", error)
            return
        }

        showToast("success", "Updated successfully")
        update({ ...user, ...values })
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
                    {values.name ? <>
                        <Input
                            type="text"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="Name"
                            styles="row-span-1"
                        />
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={values.email}
                            placeholder="Email"
                            onChange={handleChange}
                            disabled
                            styles="row-span-1"
                        />
                        <Input
                            type="text"
                            label="Image URL"
                            name="image"
                            value={values.image}
                            placeholder="Image URL"
                            onChange={handleChange}
                            styles="row-span-1"
                        /></> : <div className='w-full flex justify-center'><Loader styles="row-span-3 w-[100px] h-[100px]" /></div>}
                    <Button type="submit">Update Profile</Button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
