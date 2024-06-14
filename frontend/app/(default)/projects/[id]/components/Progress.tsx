"use client"

import { useProject } from '@/components/Providers/ProjectProvider';
import usePatchData from '@/hooks/usePatchData';
import React from 'react';

const Progress: React.FC = () => {

    const { project } = useProject()
    const criterias = project.criterias
    const finishedPoints = criterias && criterias
        .filter(criteria => criteria.isFinished)
        .reduce((total, criteria) => total + criteria.value, 0);

    const progress = criterias.reduce((total, criteria) => total + criteria.value, 0)
    const totalProgress = (finishedPoints / progress) * 100;



    const { patchData } = usePatchData("/blueprints/update")

    const handleFinish = async () => {
        await patchData({ ID: project.id, isFinished: true, finishedAt: new Date() })
    }
    const handleOpen = async () => {
        await patchData({ ID: project.id, isFinished: false, finishedAt: null })
    }

    if (totalProgress === 100 && !project.isFinished)
        handleFinish()
    else if (totalProgress < 100 && project.isFinished) {
        handleOpen()
    }

    if (criterias.length > 0)
        return <>
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-success bg-success/20">
                        Progress
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-success">
                        {totalProgress.toFixed(2)}%
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-success/20">
                <div style={{ width: `${totalProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-success"></div>
            </div></>
    else
        return <div className='flex justify-center items-center h-full font-bold'>Progress is not available</div>
};

export default Progress;
