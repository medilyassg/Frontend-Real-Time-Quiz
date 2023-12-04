import { createSlice, current } from "@reduxjs/toolkit";
const InitialState={authDataValue:{},Login:false}
const authData = createSlice ({
    name: "authData",
    initialState:InitialState,
    reducers: {
        addAuthData : (state, action) => {
            state.authDataValue=action.payload
        },
        isLogin:(state,action)=>{
            state.Login=true
        }

    }
});

export const {addAuthData,isLogin} = authData.actions;

export default authData.reducer;
