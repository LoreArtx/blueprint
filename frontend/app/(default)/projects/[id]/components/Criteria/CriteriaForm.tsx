//@ts-nocheck
//use client

import { showToast } from '@/app/utils/showToast'
import { Button, Input, Textarea, Select } from '@/components/UI'
import useForm from '@/hooks/useForm'
import usePatchData from '@/hooks/usePatchData'
import { useSession } from 'next-auth/react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useProject } from '@/components/Providers/ProjectProvider'
import ICriteria from '@/types/ICriteria'


interface CriteriaFormProps {
    onClose: () => void,
}

const CriteriaForm: React.FC<CriteriaFormProps> = ({ onClose }) => {
    const { project, updateProject } = useProject()
    const initialValues = {
        title: '',
        description: '',
        value: 0,
        user: 'all'
    }

    const { values, handleChange } = useForm(initialValues)
    const { data: session } = useSession()
    const { title, description, value, user } = values
    const { error, patchData } = usePatchData(`/blueprints/add/criteria`)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title || !description || !value) {
            showToast("error", "Inputs can't be empty")
            return
        }

        values.value = parseInt(value)

        const newCriteria: ICriteria = { ...values, creatorEmail: session?.user.email, iD: project.id, isFinished: false, studentEmail: user }

        await patchData(newCriteria)
        if (error) {
            showToast("error", error)
            return
        }
        showToast("success", "Successfully added criteria")
        onClose()
        updateProject({ ...project, criterias: [...project.criterias, newCriteria] })
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

                <Select
                    label="To Whom"
                    value={user}
                    name="user"
                    onChange={handleChange}
                    options={[
                        { value: 'all', label: 'All' },
                        ...project.users.map(u => ({ value: u, label: u }))
                    ]}
                />

                <div className='mt-4'>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default CriteriaForm