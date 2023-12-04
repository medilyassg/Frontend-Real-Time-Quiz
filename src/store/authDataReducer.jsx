import { createSlice, current } from "@reduxjs/toolkit";
const InitialState={authDataValue:{}}
const authData = createSlice ({
    name: "authData",
    initialState:InitialState,
    reducers: {
        addAuthData : (state, action) => {
            state.authDataValue=action.payload
        },

    }
});

export const {addAuthData} = authData.actions;

export default authData.reducer;
