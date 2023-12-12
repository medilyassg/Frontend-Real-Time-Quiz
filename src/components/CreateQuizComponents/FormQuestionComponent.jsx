import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { change_value_checkbox, update_responseFour, update_responseOne, update_responseThree, update_responseTwo } from "../../store/createQuizReducer"


const FormQuestionComponent=(props)=>{
    const dispatch=useDispatch()
    const createQuiz=useSelector(state=>state.createQuizData)
    const [quiz,setQuiz]=useState(props.quiz)
    const res1 = createQuiz.ansewrs[createQuiz.currentIndex]?.response[0].reponseOne || "";
    const res2 = createQuiz.ansewrs[createQuiz.currentIndex]?.response[1].reponseTwo || "";
    const res3 = createQuiz.ansewrs[createQuiz.currentIndex]?.response[2].reponseThree || "";
    const res4 = createQuiz.ansewrs[createQuiz.currentIndex]?.response[3].reponseFour || "";
    const checkVal = createQuiz.ansewrs[createQuiz.currentIndex]?.checkValue || null;
    const [responseOne,setResponseOne]=useState(res1)
    const [responseTwo,setResponseTwo]=useState(res2)
    const [responseThree,setResponseThree]=useState(res3)
    const [responseFour,setResponseFour]=useState(res4)
    const [selectedCheckbox, setSelectedCheckbox] = useState(checkVal);
    useEffect(()=>{
        if (createQuiz.ansewrs && createQuiz.ansewrs[createQuiz.currentIndex]) {
            setResponseOne(createQuiz.ansewrs[createQuiz.currentIndex].response[0].reponseOne);
            setResponseTwo(createQuiz.ansewrs[createQuiz.currentIndex].response[1].reponseTwo);
            setResponseThree(createQuiz.ansewrs[createQuiz.currentIndex].response[2].reponseThree);
            setResponseFour(createQuiz.ansewrs[createQuiz.currentIndex].response[3].reponseFour);
            setSelectedCheckbox(createQuiz.ansewrs[createQuiz.currentIndex].checkValue)
        }
    },[createQuiz.currentIndex,createQuiz.etat,createQuiz.ansewrs[createQuiz.currentIndex]?.checkValue])
    useEffect(()=>{
        setQuiz(()=>{
            return props.quiz
        })
    },[props.quiz])
    if(quiz[0]=="Quiz"){
        return<>
            <div className="option-item" style={{ "backgroundColor":responseOne==""?"white":"#DA1A3A" }}>
                <div className="list-question" style={{ "backgroundColor":"#DA1A3A" }}></div>
                <input type="text" value={responseOne}  style={{ "backgroundColor":responseOne==""?"white":"#DA1A3A","color":responseOne==""?"black":"white" }} onChange={(e)=>{setResponseOne(e.target.value);dispatch(update_responseOne(e.target.value))}} className="block h-full border-gray-300 border-none shadow-sm resize-none w-72 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none" maxLength={31} placeholder="Ajoute une réponse 1" />
                <div className="checkbox-wrapper-31">
                <input type="checkbox" name="reponse1"  checked={selectedCheckbox === 'reponse1'} onChange={() =>{dispatch(change_value_checkbox('reponse1'))}}/>
                <svg viewBox="0 0 35.6 35.6" style={{ "display":responseOne==""?"none":"block" }}>
                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                </svg>
                </div>
            </div>

            <div className="option-item" style={{ "backgroundColor":responseTwo==""?"white":"#1368CE" }}>
                <div className="list-question" style={{ "backgroundColor":"#1368CE" }}></div>
                <input type="text" value={responseTwo} style={{ "backgroundColor":responseTwo==""?"white":"#1368CE","color":responseTwo==""?"black":"white" }} onChange={(e)=>{setResponseTwo(e.target.value);dispatch(update_responseTwo(e.target.value))}}  className="block h-full border-gray-300 border-none shadow-sm resize-none w-72 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none" maxLength={31} placeholder="Ajoute une réponse 2" />
                <div className="checkbox-wrapper-31">
                <input type="checkbox" name="reponse2" checked={selectedCheckbox === 'reponse2'} onChange={() =>{dispatch(change_value_checkbox('reponse2'))}} />
                <svg viewBox="0 0 35.6 35.6" style={{ "display":responseTwo==""?"none":"block" }}>
                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                </svg>
                </div>
            </div>

            <div className="option-item" style={{ "backgroundColor":responseThree==""?"white":"#D89E00" }}>
                <div className="list-question" style={{ "backgroundColor":"#D89E00" }}></div>
                <input type="text" value={responseThree} style={{ "backgroundColor":responseThree==""?"white":"#D89E00","color":responseThree==""?"black":"white" }} onChange={(e)=>{setResponseThree(e.target.value);dispatch(update_responseThree(e.target.value))}} className="block h-full border-gray-300 border-none shadow-sm resize-none w-72 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none" maxLength={31} placeholder="Ajoute une réponse 3" />
                <div className="checkbox-wrapper-31">
                <input type="checkbox" name="reponse3" checked={selectedCheckbox === 'reponse3'} onChange={() =>{dispatch(change_value_checkbox('reponse3'))}} />
                <svg viewBox="0 0 35.6 35.6" style={{ "display":responseThree==""?"none":"block" }}>
                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                </svg>
                </div>
            </div>

            <div className="option-item" style={{ "backgroundColor":responseFour==""?"white":"#26890C" }}>
                <div className="list-question" style={{ "backgroundColor":"#26890C" }}></div>
                <input type="text" value={responseFour} style={{ "backgroundColor":responseFour==""?"white":"#26890C","color":responseFour==""?"black":"white" }} onChange={(e)=>{setResponseFour(e.target.value);dispatch(update_responseFour(e.target.value))}} className="block h-full border-gray-300 border-none shadow-sm resize-none w-72 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none" maxLength={31} placeholder="Ajoute une réponse 4" />
                <div className="checkbox-wrapper-31">
                <input type="checkbox" name="reponse4" checked={selectedCheckbox === 'reponse4'} onChange={() =>{dispatch(change_value_checkbox('reponse4'))}} />
                <svg viewBox="0 0 35.6 35.6" style={{ "display":responseFour==""?"none":"block" }}>
                    <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
                    <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                </svg>
                </div>
            </div>
        </>
    }
}

export default FormQuestionComponent