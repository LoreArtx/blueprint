import React from 'react'
import { twMerge } from 'tailwind-merge'
import RemoveCriteria from './RemoveCriteria'
import EditCriteria from './EditCriteria'
import IBlueprint from '@/types/IBlueprint'

interface CriteriasListProps {
    project: IBlueprint
    moderate: boolean
}

const CriteriaList: React.FC<CriteriasListProps> = ({ moderate, project }) => {
    return (
        <div className="space-y-2 flex flex-col gap-4">
            {project.criterias && project.criterias.map(criteria => {
                const criteriaValueStyle = twMerge(
                    "col-span-1 flex items-center justify-center text-[20px] rounded",
                    criteria.isFinished ? "bg-success text-milk" : "border-night border-[1px]"
                )

                return <div key={criteria.id} className='grid grid-cols-8'>
                    <div className={twMerge(
                        moderate ? "col-span-7" : "col-span-8",
                        "p-2 bg-gray-100 rounded shadow grid grid-cols-6"
                    )}>
                        <div className='col-span-5'>
                            <h3 className="text-lg font-semibold">{criteria.title}</h3>
                            <p>{criteria.description}</p>
                        </div>

                        <div className={criteriaValueStyle}>{criteria.value}</div>
                    </div>
                    {
                        moderate && <div className='flex flex-col gap-2 items-center ml-4'>
                            <RemoveCriteria projectId={project.id} criteriaId={criteria.id} />
                            <EditCriteria isFinished={criteria.isFinished} projectId={project.id} criteriaId={criteria.id} />
                        </div>}

                </div>
            })}
        </div>
    )
}

export default CriteriaList