import { showToast } from '@/app/utils/showToast'
import { useProject } from '@/components/Providers/ProjectProvider'
import { Button } from '@/components/UI'
import usePatchData from '@/hooks/usePatchData'
import ICriteria from '@/types/ICriteria'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface RemoveCriteriaProps {
    criteria: ICriteria
}

const RemoveCriteria: React.FC<RemoveCriteriaProps> = ({ criteria }) => {
    const { patchData } = usePatchData("/blueprints/remove/criteria")
    const { project, updateProject } = useProject()

    const handleRemove = async () => {
        await patchData({ blueprintID: project.id, criteriaID: criteria.id })
        showToast("success", "Criteria was removed")
        const newCriterias = project.criterias.filter(c => c.id !== criteria.id)
        updateProject({ ...project, criterias: newCriterias })
    }
    return (
        <Button styles='bg-error hover:bg-error/60' onClick={handleRemove}><FontAwesomeIcon icon={faTrash} /></Button>
    )
}

export default RemoveCriteria