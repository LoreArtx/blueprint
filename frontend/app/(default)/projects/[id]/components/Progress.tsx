"use client"

import ICriteria from '@/types/ICriteria';
import React from 'react';
import { compileString } from 'sass';

interface ProgressProps {
    progress: number;
    criterias: ICriteria[];
}

const Progress: React.FC<ProgressProps> = ({ progress, criterias }) => {

    const finishedPoints = criterias
        .filter(criteria => criteria.isFinished)
        .reduce((total, criteria) => total + criteria.value, 0);
    const totalProgress = progress > 0 ? (finishedPoints / progress) * 100 : 0;

    console.log((finishedPoints / progress) * 100)

    return (
        <div className="col-span-4 row-span-1 bg-white p-4 rounded shadow">
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
            </div>
        </div>
    );
};

export default Progress;
