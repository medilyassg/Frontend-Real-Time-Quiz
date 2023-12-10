import { createSlice, current } from "@reduxjs/toolkit";
const InitialState={show:false,display:true}
const show = createSlice ({
    name: "display",
    initialState:InitialState,
    reducers: {
        showing : (state, action) => {
            state.show=action.payload
        },
        display : (state, action) => {
            state.display=action.payload
        },

    }
});

export const {showing,display} = show.actions;

export default show.reducer;