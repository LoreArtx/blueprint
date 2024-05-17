import Link from 'next/link'
import React from 'react'

const ProfilePage = () => {
    return (
        <div>ProfilePage
            <div>
                <Link href="/profile/settings">Settings</Link>
            </div>
        </div>
    )
}

export default ProfilePage