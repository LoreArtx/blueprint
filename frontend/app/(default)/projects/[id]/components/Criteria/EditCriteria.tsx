import { showToast } from '@/app/utils/showToast'
import { Button } from '@/components/UI'
import usePatchData from '@/hooks/usePatchData'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface EditCriteriaProps {
    projectId: string,
    criteriaId: string,
    isFinished: boolean
}

const EditCriteria: React.FC<EditCriteriaProps> = ({ projectId, criteriaId, isFinished }) => {
    const { error, patchData } = usePatchData("/blueprints/update/criteria")

    const handleEdit = async () => {
        const updatedStatus = !isFinished;
        await patchData({ blueprintID: projectId, criteriaID: criteriaId, isFinished: updatedStatus });
        if (error) {
            showToast('error', error);
        } else {
            showToast('success', updatedStatus ? 'Checked' : 'Unchecked');
        }
    }
    return (
        <Button onClick={handleEdit}><FontAwesomeIcon icon={isFinished ? faX : faCheck} /></Button>
    )
}

export default EditCriteria