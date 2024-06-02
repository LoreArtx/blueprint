"use client"

import React from 'react'
import { SessionProvider as SessProv } from "next-auth/react"
import { Session } from 'next-auth'

const SessionProvider = ({ session, children }: { session: Session | null, children: any }) => {
  return (
    <SessProv session={session}>
      {children}
    </SessProv>
  )
}

export default SessionProvider