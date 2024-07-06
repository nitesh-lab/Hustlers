import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DashBoard_State {
    active: "dashboard" | "network" | "messaging" | "job";
}

const initialState: DashBoard_State = {
    active: "dashboard",
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        active_action: (state, action: PayloadAction<DashBoard_State['active']>) => {
            return { ...state, active: action.payload };
        }
    }
});

export const { active_action } = dashboardSlice.actions;

export default dashboardSlice.reducer;
