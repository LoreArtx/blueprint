"use client"

import { signIn } from 'next-auth/react'
import React from 'react'

const NotAuthOptions = () => {
    return (
        <>
            <li><button onClick={() => signIn()}>Sign in</button></li>
            <li></li>
        </>
    )
}

export default NotAuthOptions