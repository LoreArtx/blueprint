import Link from 'next/link'
import React from 'react'
import AuthOptions from './AuthOptions'
import NotAuthOptions from './NotAuthOptions'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const Navbar = async ({ isLoginPage = false }: { isLoginPage?: boolean }) => {
    const session = await getServerSession(options);
    // console.log(session)

    return (
        <nav className='flex justify-between items-center bg-gradient-lazurite text-milk px-[50px] h-[50px]'>
            <div>
                <Link href={"/"} className='text-[20px]'>Blueprint</Link>
            </div>
            {!isLoginPage && <ul className='flex justify-center items-center gap-[30px]'>
                <Link href={"/projects/create"}>Add project</Link>
                {session ? <AuthOptions session={session} /> : <NotAuthOptions />}
            </ul>}
        </nav>
    )
}

export default Navbar