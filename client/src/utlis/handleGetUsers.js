import axios from "axios";

const setUserOptionsState = (usersOptionState, firstGetUsers)=>{
    let userOptions = {...usersOptionState}
    if (firstGetUsers){
        userOptions.pageSize=20
    }
    else{
        userOptions.pageSize=10
    }
    return userOptions
}

const handleFirstGetUsers=(userOptionsState, baseUrl)=>{
    let userOptions = setUserOptionsState(userOptionsState, true)
    window.scrollTo(0, 0)
    return axios.post(baseUrl, userOptions)
}

const handleAddUsers=(userOptionsState, baseUrl)=>{
    let userOptions = setUserOptionsState(userOptionsState, false)
    return axios.post(baseUrl, userOptions)
}

export const handleGetUser = async (setNewUsers, getState, baseUrl)=>{
    const userOptionsSTate = getState().user.userOptions
    let response
    if (setNewUsers){
        response = await handleFirstGetUsers(userOptionsSTate, baseUrl)
    }
    else{
        response = await handleAddUsers(userOptionsSTate, baseUrl)
    }
    return {
        data: response.data,
        setNewUsers
    }
}

