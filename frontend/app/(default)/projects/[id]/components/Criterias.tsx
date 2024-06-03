"use client"

import ICriteria from '@/types/ICriteria';
import React from 'react';

interface CriteriasProps {
    criterias: ICriteria[];
}

const Criterias: React.FC<CriteriasProps> = ({ criterias }) => {
    return (
        <div className="col-span-4 row-span-2 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Criterias</h2>
            <div className="space-y-2">
                {criterias.map(criteria => (
                    <div key={criteria.id} className="p-2 bg-gray-100 rounded shadow grid grid-cols-6">
                        <div className='col-span-5'>
                            <h3 className="text-lg font-semibold">{criteria.title}</h3>
                            <p>{criteria.description}</p>
                        </div>

                        <div className="col-span-1 flex items-center justify-center text-[20px] rounded bg-success text-milk">{criteria.value}</div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Criterias;
