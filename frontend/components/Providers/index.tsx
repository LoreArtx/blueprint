import React from 'react'
import SessionProvider from './SessionProvider'
import ToastProvider from './ToastProvider'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const Providers = async ({ children }: React.PropsWithChildren) => {
    const session = await getServerSession(options)
    return (
        <SessionProvider session={session}>
            <ToastProvider>
                {children}
            </ToastProvider>
        </SessionProvider>
    )
}

export default Providers