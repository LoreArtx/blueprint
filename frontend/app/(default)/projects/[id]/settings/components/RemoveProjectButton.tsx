import { showToast } from '@/app/utils/showToast'
import { useProject } from '@/components/Providers/ProjectProvider'
import { Button, Input, Modal } from '@/components/UI'
import useDeleteData from '@/hooks/useDeleteData'
import useForm from '@/hooks/useForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RemoveProjectButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const initialValues = {
        saveWord: ""
    }
    const { values, handleChange } = useForm(initialValues)

    const { error, deleteData } = useDeleteData("/blueprints/delete")
    const { project } = useProject()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (values.saveWord === "I am sure") {
            await deleteData({ iD: project.id })
            if (error) {
                showToast("error", error)
                return
            }
            showToast("success", "It's deleted now")
            setIsOpen(false)
            router.push("/")
        } else {
            showToast("error", "You are not sure enough")
            setIsOpen(false)
        }
    }
    return (
        <div><Button onClick={() => setIsOpen(true)} styles='bg-error hover:bg-error/70 hover:text-white transition-all h-full rounded-none border-r-2 w-[150px]'>Remove Project</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <form onSubmit={handleSubmit} className='bg-white p-4 rounded-lg'>
                    <span>Do you really want to delete this project?</span>
                    <div>type <i><b>I am sure</b></i></div>
                    <Input type="text" label="" placeholder='' name='saveWord' value={values.saveWord} onChange={handleChange} />
                    <Button type='submit' styles='bg-error hover:bg-error/80'>Delete</Button>
                </form>
            </Modal></div>
    )
}

export default RemoveProjectButton