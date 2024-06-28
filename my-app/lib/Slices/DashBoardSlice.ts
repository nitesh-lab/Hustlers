import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface DashBoard_State {
    active: "home" | "network" | "messaging" | "jobs";
}

const initialState: DashBoard_State = {
    active: "home",
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        active_action: (state, action: PayloadAction<DashBoard_State['active']>) => {
            console.log("active_action reducer called with");
            console.log(action.payload);

            return { ...state, active: action.payload };
        }
    }
});

export const { active_action } = dashboardSlice.actions;

export default dashboardSlice.reducer;
