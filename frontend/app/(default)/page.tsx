"use client"

import Loader from '@/components/UI/Loader';
import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  const { data, loading, error } = useFetchData<IBlueprint[] | null>("http://localhost:5555/api/blueprints");

  return (
    <div className='flex-auto'>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-gray-100 rounded flex flex-col">
          <div className="text-xl font-semibold mb-2 px-4  bg-lazurite text-milk">Projects</div>
          <ul className='px-4'>
            {data && data.map((blueprint) => (
              <li key={blueprint.id} className="mb-2 underline">
                <Link href={`projects/${blueprint.id}`}>{blueprint.title}</Link>
              </li>
            ))}
            {error && <p className="text-red-500">Failed to load projects</p>}
          </ul>
          {loading && <div className='flex justify-center items-center'>
            <Loader styles='w-[50px] h-[50px]' />
          </div>}
        </div>
        <div className="col-span-9 bg-gray-100 rounded flex flex-col">
          <div className="text-xl font-semibold mb-2 px-4 bg-gradient-lazurite text-milk">Welcome</div>
          <p className='px-4'>some hello text</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
