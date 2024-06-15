"use client"

import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import RemoveProjectButton from './RemoveProjectButton'

const Tabs = () => {

    const tabsItems = [
        { title: "Update Info", href: "/" },
        { title: "Manage Users", href: "/users" }
    ]
    const pathName = usePathname()
    const pathParts = pathName.split("/settings")
    const projectPath = pathParts[0]
    const location = pathParts[0] + "/settings"


    return (
        <>
            <Link href={projectPath} className='absolute top-[-10px] inline-flex items-center gap-1'><FontAwesomeIcon size={"lg"} icon={faArrowAltCircleLeft} />   Return to project</Link>
            <div className='flex bg-white justify-between mt-[20px]'>
                <div className='flex'>
                    {tabsItems.map((tab) => {

                        const isFirstTab = pathParts[1] === "" && tab.href === "/"

                        const selectedTab = pathParts[1] === tab.href

                        const styles = twMerge('p-4 border-r-2 cursor-pointer hover:bg-milk/30 transition-all',
                            isFirstTab && "bg-milk/50",
                            selectedTab && "bg-milk/50"
                        )

                        return <Link href={location + tab.href} key={tab.title} className={styles}>
                            {tab.title}</Link>
                    })}
                    <RemoveProjectButton />
                </div>
                <h2 className='flex justify-center items-center mr-8 text-[30px]'>Settings</h2>
            </div>
        </>
    )
}

export default Tabs