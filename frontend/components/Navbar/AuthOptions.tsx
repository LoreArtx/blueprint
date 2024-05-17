import Link from "next/link"
import React from 'react'


const AuthOptions = () => {
    return (
        <>
            <li><Link href="/projects">Your projects</Link></li>
            <li><Link href="/profile">Profile</Link></li>
        </>
    )
}

export default AuthOptions