import { showToast } from '@/app/utils/showToast'
import { Button } from '@/components/UI'
import usePatchData from '@/hooks/usePatchData'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface RemoveCriteriaProps {
    projectId: string,
    criteriaId: string
}

const RemoveCriteria: React.FC<RemoveCriteriaProps> = ({ projectId, criteriaId }) => {
    const { patchData } = usePatchData("/blueprints/remove/criteria")


    const handleRemove = async () => {
        await patchData({ blueprintID: projectId, criteriaID: criteriaId })
        showToast("success", "Criteria was removed")
    }
    return (
        <Button styles='bg-error hover:bg-error/60' onClick={handleRemove}><FontAwesomeIcon icon={faTrash} /></Button>
    )
}

export default RemoveCriteria