import { createSlice, current } from "@reduxjs/toolkit";
const InitialState={ansewrs:[{question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
                {reponseOne:"",correct:false},
                {reponseTwo:"",correct:false},
                {reponseThree:"",correct:false},
                {reponseFour:"",correct:false}
],checkValue:null}],nomQuiz:"",currentIndex:0,etat:false}
const createQuizData = createSlice ({
    name: "createQuizData",
    initialState:InitialState,
    reducers: {
        add_ansewr: (state, action) => {
            state.ansewrs.push(action.payload)
        },
        change_current_index:(state,action)=>{
            state.currentIndex=action.payload
        },
        remove_element:(state,action)=>{
            state.ansewrs=state.ansewrs.filter((item,index)=>{
                if(index!=action.payload){
                    return true
                }
            })
            state.etat=!state.etat
        },
        update_answer:(state,action)=>{
            state.ansewrs[state.currentIndex].question=action.payload
        },
        update_responseOne:(state,action)=>{
            state.ansewrs[state.currentIndex].response[0].reponseOne=action.payload
        },
        update_responseTwo:(state,action)=>{
            state.ansewrs[state.currentIndex].response[1].reponseTwo=action.payload
        },
        update_responseThree:(state,action)=>{
            state.ansewrs[state.currentIndex].response[2].reponseThree=action.payload
        },
        update_responseFour:(state,action)=>{
            state.ansewrs[state.currentIndex].response[3].reponseFour=action.payload
        },
        update_type:(state,action)=>{
            state.ansewrs[state.currentIndex].type=action.payload
        },
        update_temp:(state,action)=>{
            state.ansewrs[state.currentIndex].temp=action.payload
        },
        update_point:(state,action)=>{
            state.ansewrs[state.currentIndex].point=action.payload
        },
        update_limitdereponse:(state,action)=>{
            state.ansewrs[state.currentIndex].limitdereponse=action.payload
        },
        update_nom_quiz:(state,action)=>{
            state.nomQuiz=action.payload
        },
        change_value_checkbox:(state,action) => {
            state.ansewrs[state.currentIndex].checkValue=action.payload
            if(action.payload=='reponse1'){
                state.ansewrs[state.currentIndex].response[0].correct=true
                state.ansewrs[state.currentIndex].response[1].correct=false
                state.ansewrs[state.currentIndex].response[2].correct=false
                state.ansewrs[state.currentIndex].response[3].correct=false
            }
            if(action.payload=='reponse2'){
                state.ansewrs[state.currentIndex].response[0].correct=false
                state.ansewrs[state.currentIndex].response[1].correct=true
                state.ansewrs[state.currentIndex].response[2].correct=false
                state.ansewrs[state.currentIndex].response[3].correct=false
            }
            if(action.payload=='reponse3'){
                state.ansewrs[state.currentIndex].response[0].correct=false
                state.ansewrs[state.currentIndex].response[1].correct=false
                state.ansewrs[state.currentIndex].response[2].correct=true
                state.ansewrs[state.currentIndex].response[3].correct=false
            }
            if(action.payload=='reponse4'){
                state.ansewrs[state.currentIndex].response[0].correct=false
                state.ansewrs[state.currentIndex].response[1].correct=false
                state.ansewrs[state.currentIndex].response[2].correct=false
                state.ansewrs[state.currentIndex].response[3].correct=true
            }
        },
        reset_quiz_data:(state) => {
            state.ansewrs = [{question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
              {reponseOne:"",correct:false},
              {reponseTwo:"",correct:false},
              {reponseThree:"",correct:false},
              {reponseFour:"",correct:false}
            ],checkValue:null}];
            state.nomQuiz = "";
            state.currentIndex = 0;
            state.etat = false;
        }

    }
});

export const {add_ansewr,change_current_index,remove_element,update_answer,
    update_responseOne,update_responseTwo,update_responseThree,update_responseFour
,update_type,update_temp,update_point,update_limitdereponse,update_nom_quiz,change_value_checkbox,
reset_quiz_data
} = createQuizData.actions;

export default createQuizData.reducer;