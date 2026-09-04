import z from "zod"

export type InitialAuthState = {
    users : User[],
    user : User | undefined,
}

export type IntitialUserState = {
    user : User
}

export type User = {
    name : string,
    email : string,
    role : Role,
    password : string
}


export enum Role {
    vendor = "vendor",
    buyer = "buyer"
}