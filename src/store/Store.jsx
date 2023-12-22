import { configureStore } from "@reduxjs/toolkit";
import show from './displayComponentReducer'
import createQuizData from './createQuizReducer'

const store=configureStore({reducer:{
    display:show,
    createQuizData:createQuizData
}})

export default store;
