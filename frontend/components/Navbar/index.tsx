import Link from 'next/link'
import React from 'react'
import AuthOptions from './AuthOptions'
import NotAuthOptions from './NotAuthOptions'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'

const Navbar = async ({ isLoginPage = false }: { isLoginPage?: boolean }) => {
    const session = await getServerSession(options);
    return (
        <nav className='flex justify-between items-center bg-gradient-lazurite text-milk px-[50px] h-[50px]'>
            <div>
                <Link href={"/"} className='text-[30px] font-bold'>Blueprint</Link>
            </div>
            {!isLoginPage && <ul className='flex justify-center items-center gap-[30px]'>
                <Link href={"/projects/create"} className='bg-milk rounded-lg text-night px-2 py-1 hover:bg-milk/55 transition-all'>New project <FontAwesomeIcon icon={faAdd} className='ml-[7px]' /></Link>
                {session ? <AuthOptions session={session} /> : <NotAuthOptions />}
            </ul>}
        </nav>
    )
}

export default Navbar