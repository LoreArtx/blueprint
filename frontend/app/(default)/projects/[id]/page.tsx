import React from 'react'
import ProjectFiles from './components/ProjectFiles';
import Description from './components/Description';
import Progress from './components/Progress';
import Criterias from './components/Criteria/Criterias';

const ProjectPage = () => {
    return (
        <div className="container mx-auto p-4 grid grid-cols-12 grid-rows-7 gap-4">
            <div className='col-span-8 row-span-7'><ProjectFiles /></div>
            <div className='col-span-4 row-span-1'><Description /></div>
            <div className='col-span-4 row-span-1 bg-white p-4 rounded shadow-lg h-full'><Progress /></div>
            <div className='col-span-4 row-span-5'><Criterias /></div>
        </div>
    );
}

export default ProjectPage

