import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialAuthState, User } from "./auth.type";
import { useDispatch } from "react-redux";
import { email } from "zod";

const initialState : InitialAuthState = {
    users : [],
    user  : undefined,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        addUser (state, action : PayloadAction<User>) {
            const userAction : User = {
                name : action.payload.name,
                email : action.payload.email,
                role: action.payload.role,
                password : action.payload.password
            }
            if (state.users.some((user) => user.email === userAction.email)){
                return;
            }

            state.users.push(userAction);
            state.user = userAction
        }, 

        login : (state, action : PayloadAction<{email: string, password : string}>) => {

            const user = state.users.find((u) => u.email === action.payload.email)

            if (!user) {
                console.error("User not found")
                return;
            }

            if (user.password !== action.payload.password) {
                console.error("Password not correct")
                return;
            }

            state.user = user;
            
        },

        logout : (state) => {
            state.user = undefined
        }
    },
})

export const {addUser, login, logout} = authSlice.actions
export default authSlice.reducer