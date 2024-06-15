"use client"

import { showToast } from '@/app/utils/showToast'
import { Button, Input, Modal } from '@/components/UI'
import useDeleteData from '@/hooks/useDeleteData'
import useForm from '@/hooks/useForm'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

const DeleteProfileButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { values, handleChange } = useForm({ saveWord: "" })
    const { error, deleteData } = useDeleteData("/users/delete")

    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (values.saveWord === "I am sure") {
            //@ts-ignore
            await deleteData({ iD: session?.user.dbID })
            if (error) {
                showToast("error", error)
                return
            }
            showToast("success", "It's deleted now")
            setIsOpen(false)
            // router.push("/")
        } else {
            showToast("error", "You are not sure enough")
            setIsOpen(false)
        }
    }

    return (
        <>
            <div className='flex'><Button styles='bg-error hover:bg-error/80' onClick={() => setIsOpen(true)}>Delete Profile</Button></div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit} className='bg-white p-4 rounded-lg'>
                    <span>Do you really want to delete your profile?</span>
                    <div>type <i><b>I am sure</b></i></div>
                    <Input type="text" label="" placeholder='' name='saveWord' value={values.saveWord} onChange={handleChange} />
                    <Button type='submit' styles='bg-error hover:bg-error/80'>Delete</Button>
                </form>
            </Modal>
        </>
    )
}

export default DeleteProfileButton