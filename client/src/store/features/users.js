import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {handleGetUser} from "../../utlis/handleGetUsers";


// const baseUrl = 'http://localhost:5000/api/data'
const baseUrl = 'https://itransition-task5-server.vercel.app/api/data'

export const countries = [
    {id:"US", name: "USA"},
    {id:"PL", name: "Poland"},
    {id:"GEO", name: "Georgia"},
]

export const userOptions = {
    "country": countries[0].id,
    "errorsPerRecord": 0,
    "seed": 0,
    "pageSize": 10,
    "page": 1
}

const initialState = {
    users:[],
    userOptions,
    loading: false,
    error: null
}

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (setNewUsers=false, { getState }) => {
        return handleGetUser(setNewUsers, getState, baseUrl)
    }
)

export const UserSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.loading = action.payload
        },
        setOptions: (state, action) => {
            state.userOptions = {...state.userOptions,...action.payload}
        },
        increasePage:(state)=>{
            state.userOptions.page = state.userOptions.page+1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                if(action.payload.setNewUsers) state.users = []
                state.users = [...state.users, ...action.payload.data]
            })
            .addCase(getUsers.rejected, (state) => {
                alert("Can't get users 11")
                state.loading = false
            })
    },
})

export const { setLoader, setOptions, increasePage } = UserSlice.actions

export default UserSlice.reducer