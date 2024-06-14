//@ts-nocheck

import { PropsWithChildren } from 'react';
import Tabs from './components/Tabs';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import asyncFetchData from '@/app/utils/asyncFetchData';
import { redirect } from 'next/navigation';
import IBlueprint from '@/types/IBlueprint';

interface SettingsPageLayoutProps {
    params: { id: string };
}

const SettingsPageLayout = async ({ children, params }: PropsWithChildren<SettingsPageLayoutProps>) => {
    const session = await getServerSession(options);
    const data = await asyncFetchData<IBlueprint>(`/blueprints/${session.user.dbID}/${params.id}`);
    if (!data || data.creatorId !== session?.user.dbID) {
        redirect('http://localhost:3000/');
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
