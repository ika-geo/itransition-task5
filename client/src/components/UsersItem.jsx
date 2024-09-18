import React from 'react';


const UsersItem = ({user, id}) => {
    return (
        <div className='grid grid-cols-12 break-words mb-2'>
            <p className='col-span-1 p-2'>{id + 1}</p>
            <p className='col-span-2 p-2'>{user.id}</p>
            <p className='col-span-2 p-2'>{user.name}</p>
            <p className='col-span-4 p-2'>{user.address}</p>
            <p className='col-span-3 p-2'>{user.phone}</p>
        </div>
    );
};

export default UsersItem;