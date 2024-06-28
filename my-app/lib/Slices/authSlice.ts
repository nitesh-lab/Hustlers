import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User_State {
    name: string;
    email?: string;
    _id: string;
    profile_url: string;
}

export interface Auth_State {
    isLoggedIn: boolean;
    user: User_State;
}

const initialState: Auth_State = {
    isLoggedIn: false,
    user: { name: "", email: "", _id: "", profile_url: "" }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loggedIn_action: (state, action: PayloadAction<User_State>) => {
            console.log("loggedIn_action reducer called");
            console.log(action.payload);
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        }
    }
});

export const { loggedIn_action } = authSlice.actions;

export default authSlice.reducer;
