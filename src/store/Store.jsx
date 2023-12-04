import { configureStore } from "@reduxjs/toolkit";
import authData from './authDataReducer'

const store=configureStore({reducer:{
    authData:authData
}})

export default store;
