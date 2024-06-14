//@ts-nocheck
//use client

import { showToast } from '@/app/utils/showToast'
import { Button, Input, Textarea } from '@/components/UI'
import useForm from '@/hooks/useForm'
import usePatchData from '@/hooks/usePatchData'
import { useSession } from 'next-auth/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useProject } from '@/components/Providers/ProjectProvider'


interface CriteriaFormProps {
    onClose: () => void,
}

const CriteriaForm: React.FC<CriteriaFormProps> = ({ onClose }) => {
    const { project } = useProject()
    const initialValues = {
        title: '',
        description: '',
        value: 0
    }

    const { values, handleChange } = useForm(initialValues)
    const { data: session } = useSession()
    const { title, description, value } = values
    const { error, patchData } = usePatchData(`/blueprints/add/criteria`)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title || !description || !value) {
            showToast("error", "Inputs can't be empty")
            return
        }

        values.value = parseInt(value)

        await patchData({ ...values, creatorId: session?.user.dbID, iD: project.id, isFinished: false })
        if (error) {
            showToast("error", error)
            return
        }
        showToast("success", "Successfully added criteria")
        onClose()
    }

    return (
        <div className='w-[300px] rounded-lg px-4 py-3 bg-milk relative'>
            <div className='absolute w-[20px] h-[20px] right-[5px] top-[7px] border border-night bg-milk flex justify-center items-center cursor-pointer hover:bg-white transition-all rounded' onClick={onClose}><FontAwesomeIcon icon={faClose} /></div>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Title"
                    name='title'
                    placeholder=''
                    value={title}
                    onChange={handleChange}
                />
                <Textarea
                    label="Description"
                    name='description'
                    value={description}
                    onChange={handleChange}
                />
                <Input
                    type="number"
                    label="Value"
                    name='value'
                    placeholder=''
                    value={value}
                    onChange={handleChange} />

                <div className='mt-4'>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default CriteriaForm