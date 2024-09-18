import axios from "axios";

const setUserOptionsState = (usersOptionState, firstGetUsers, usersLength=0)=>{
    let userOptions = {...usersOptionState}
    if (firstGetUsers){
        if (usersLength>20){
            userOptions.pageSize=usersLength
        }
        else{
            userOptions.pageSize=20
        }
    }
    return userOptions
}

const handleFirstGetUsers=(userOptionsState, baseUrl)=>{
    let userOptions = setUserOptionsState(userOptionsState, true)
    window.scrollTo(0, 0)
    return axios.post(baseUrl, userOptions)
}

const handleAddUsers=(userOptionsState, baseUrl)=>{
    return axios.post(baseUrl, userOptionsState)
}

export const handleGetUser = async (setNewUsers, getState, baseUrl)=>{
    const userOptionsSTate = getState().user.userOptions
    const usersLength = getState().user.users.length
    let response
    if (setNewUsers){
        response = await handleFirstGetUsers(userOptionsSTate, baseUrl, usersLength)
    }
    else{
        response = await handleAddUsers(userOptionsSTate, baseUrl)
    }
    return {
        data: response.data,
        setNewUsers
    }
}

