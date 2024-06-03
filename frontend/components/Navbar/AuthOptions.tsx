"use client"

import React from 'react'
import { faProjectDiagram, faUser, faGear, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import DropdownMenu from "../UI/DropDownMenu";
import Image from 'next/image'


const AuthOptions = ({ session }: { session: Session }) => {

    const profileOptions = [
        { title: 'Your Projects', href: '/projects', icon: faProjectDiagram },
        { title: 'Profile', href: '/profile', icon: faUser },
        { title: 'Settings', href: '/profile/settings', icon: faGear },
        { title: 'Sign out', action: () => signOut(), icon: faSignOut, styles: "hover:bg-gradient-exit hover:text-white" }
    ]
    return (
        <DropdownMenu items={profileOptions}>
            {session.user?.image ? <Image
                src={session.user?.image} width={40}
                height={40}
                alt="Picture of the author" className='rounded' /> :
                "user"
            }
        </DropdownMenu>
    )
}

export default AuthOptions