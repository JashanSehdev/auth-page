import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IntitialUserState, User, Role } from "./auth.type";

const initialState : IntitialUserState = {
    user : {
        name : "",
        email : "",
        password : "",
        role : Role.vendor
    },
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        login : (state, action :PayloadAction<User>) => {
            state.user = action.payload
        }
    }
})

export const {login} = userSlice.actions
export default userSlice.reducer

