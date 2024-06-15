import { showToast } from '@/app/utils/showToast'
import { useProject } from '@/components/Providers/ProjectProvider'
import { Button } from '@/components/UI'
import usePatchData from '@/hooks/usePatchData'
import ICriteria from '@/types/ICriteria'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface EditCriteriaProps {
    criteria: ICriteria
}

const EditCriteria: React.FC<EditCriteriaProps> = ({ criteria }) => {
    const { error, patchData } = usePatchData("/blueprints/update/criteria")
    const { project, updateProject } = useProject()

    const handleEdit = async () => {
        const updatedStatus = !criteria.isFinished;
        await patchData({ blueprintID: project.id, criteriaID: criteria.id, isFinished: updatedStatus });
        if (error) {
            showToast('error', error);
        } else {
            showToast('success', updatedStatus ? 'Checked' : 'Unchecked');
            const newCriteriasList = project.criterias.map(c =>
                c.id === criteria.id ? { ...c, isFinished: updatedStatus } : c);
            updateProject({ ...project, criterias: newCriteriasList })
        }
    }
    return (
        <Button onClick={handleEdit}><FontAwesomeIcon icon={criteria.isFinished ? faX : faCheck} /></Button>
    )
}

export default EditCriteria