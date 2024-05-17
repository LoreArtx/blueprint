import Link from 'next/link'
import React from 'react'
import AuthOptions from './AuthOptions'
import NotAuthOptions from './NotAuthOptions'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'

const Navbar = async () => {
    const session = await getServerSession(options);
    console.log(session)
    return (
        <nav className='flex justify-between items-center bg-lazurite text-milk px-[50px] py-[7px]'>
            <div>
                <Link href={"/"} className='text-[20px]'>Blueprint</Link>
            </div>
            <ul className='flex gap-[30px]'>
                <Link href={"/projects/create"}>Add project</Link>
                {session ? <AuthOptions /> : <NotAuthOptions />}
            </ul>
        </nav>
    )
}

export default Navbar