import React from 'react';

const UsersHeader = () => {
    return (
        <div className='grid grid-cols-12 font-bold text-xl mb-4 border-b-2'>
            <h2 className='col-span-1 p-2'>N</h2>
            <h2 className='col-span-2 p-2'>ID</h2>
            <h2 className='col-span-2 p-2'>Name</h2>
            <h2 className='col-span-4 p-2'>Address</h2>
            <h2 className='col-span-3 p-2'>Phone</h2>
        </div>
    );
};

export default UsersHeader;