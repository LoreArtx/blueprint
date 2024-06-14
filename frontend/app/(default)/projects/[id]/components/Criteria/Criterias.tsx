"use client"
import React, { useState } from 'react';
import CriteriaForm from './CriteriaForm';
import { Button, Modal } from '@/components/UI';
import CriteriaList from './CriteriaList';
import { useProject } from '@/components/Providers/ProjectProvider';


const Criterias: React.FC = () => {
    const { amICreator } = useProject()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="bg-white p-4 rounded shadow-lg min-h-full">
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <h2 className="text-xl font-semibold col-span-8">Criterias</h2>
                {amICreator && <div className='col-span-4'><Button onClick={() => setIsOpen(true)}>Add</Button></div>}
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <CriteriaForm onClose={() => setIsOpen(false)}></CriteriaForm>
                </Modal>
            </div>

            <CriteriaList />
        </div>
    );
};

export default Criterias;
