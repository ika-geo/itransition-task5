import React, {useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {getUsers, increasePage, userOptions} from "./store/features/users";
import {LazyLoad} from "./utlis/lazyLoad";
import UsersHeader from "./components/UsersHeader";
import UsersItem from "./components/UsersItem";
import ToolBar from "./components/ToolBar";
import {setDefaultOptions} from "./utlis/handleInputs";

function App() {
    const dispatch = useDispatch()
    let loading = useSelector(state => state.user.loading)
    let users = useSelector(state => state.user.users)

    useEffect(() => {
        handleGetUsers()
        if (!users.length) {
            window.scrollTo(0, 0)
        }
    }, []);

    const handleAddUsers = () => {
        dispatch(increasePage())
        dispatch(getUsers(false))
    }

    const handleGetUsers = ()=>{
        setDefaultOptions(dispatch)
        dispatch(getUsers(true))
    }

    if (!loading) {
        LazyLoad(handleAddUsers, loading)
    }

    return (
        <div className='max-w-[1220px] mx-auto relative'>
            <div className='sticky top-0 left-0 bg-white'>
                <p className='text-center font-bolder text-3xl mb-5'>Users: {users.length}</p>
                <ToolBar
                    handleGetUsers={handleGetUsers}
                />
                <UsersHeader/>
            </div>

            {users.map((user, id) => (
                <UsersItem
                    key={user.id}
                    user={user}
                    id={id}
                />
            ))
            }
            {loading && <div>Loading...</div>}

        </div>
    );
}

export default App;
