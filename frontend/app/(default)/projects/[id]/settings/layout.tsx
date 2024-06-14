"use client"
import { PropsWithChildren } from 'react';
import Tabs from './components/Tabs';
import { useRouter } from 'next/navigation';
import { useProject } from '@/components/Providers/ProjectProvider';


const SettingsPageLayout = ({ children }: PropsWithChildren) => {
    const { project, amICreator } = useProject()
    const router = useRouter()
    if (!project || !amICreator) {
        router.push('/');
    }

    return (
        <div className='flex flex-col gap-0.5 flex-auto relative'>
            <Tabs />
            <div className='bg-white flex-auto h-full p-4'>
                {children}
            </div>
        </div>
    );
};

export default SettingsPageLayout;
