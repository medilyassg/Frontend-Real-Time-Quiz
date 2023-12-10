import { configureStore } from "@reduxjs/toolkit";
import authData from './authDataReducer'
import show from './displayComponentReducer'
import createQuizData from './createQuizReducer'

const store=configureStore({reducer:{
    authData:authData,
    display:show,
    createQuizData:createQuizData
}})

export default store;
