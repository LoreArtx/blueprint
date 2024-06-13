"use client"

import ICriteria from '@/types/ICriteria';
import React, { useState } from 'react';
import CriteriaForm from './AddCriteriaForm';
import { Button, Modal } from '@/components/UI';
import CriteriaList from './CriteriaList';
import IBlueprint from '@/types/IBlueprint';

interface CriteriasProps {
    moderate: boolean
    project: IBlueprint
    handleChange: (newValues: IBlueprint) => void
}

const Criterias: React.FC<CriteriasProps> = ({ moderate, project }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className=" bg-white p-4 rounded shadow h-full">
            <div className='grid grid-cols-12 gap-4 mb-4'>
                <h2 className="text-xl font-semibold col-span-8">Criterias</h2>
                {moderate && <div className='col-span-4'><Button onClick={() => setIsOpen(true)}>Add</Button></div>}
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <CriteriaForm projectId={project.id} onClose={() => setIsOpen(false)}></CriteriaForm>
                </Modal>
            </div>

            <CriteriaList project={project} moderate={moderate} />
        </div>
    );
};

export default Criterias;
