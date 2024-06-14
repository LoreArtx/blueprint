import React from 'react'
import AddUser from './components/AddUser'
import RemoveUser from './components/RemoveUser'

const ManageUsersPage = () => {
    return (
        <div className='container mx-auto grid grid-cols-12 grid-rows-2 gap-4 h-full'>
            <div className='col-span-6 row-span-2 flex flex-col gap-8'>
                <AddUser />
                <RemoveUser />
            </div>
            <div className='col-span-6 row-span-2 h-full bg-white rounded shadow-lg border flex justify-center items-center'>
                <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            </div>
        </div>
    )
}

export default ManageUsersPage