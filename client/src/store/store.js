import { configureStore } from '@reduxjs/toolkit'
import UserSlice from "./features/users";

export const store = configureStore({
    reducer: {
        user: UserSlice
    },
})