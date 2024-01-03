import '../sass/createquizpage.scss'
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from 'react';
import FormQuestionComponent from './CreateQuizComponents/FormQuestionComponent';
import OptionQuizComponent from './CreateQuizComponents/OptionQuizComponent';
import DiapositiveComponent from './CreateQuizComponents/DiapositiveComponent';
import NavBarComponent from './CreateQuizComponents/NavBarComponent';
import { useDispatch, useSelector } from 'react-redux';
import { showing,display } from '../store/displayComponentReducer';
import { update_answer } from '../store/createQuizReducer';
import { useNavigate } from 'react-router-dom';
import { api } from '../../config/axios';
const CreateQuizPage=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [isLogin,setIsLogin]=useState(null)
    const showingData=useSelector(state=>state.display)
    const createQuiz=useSelector(state=>state.createQuizData)
    const [typequiz,setTypeQuiz]=useState(["Quiz"])
    const initialAnswerValue = createQuiz.ansewrs[createQuiz.currentIndex]?.question || "";
    const[displayOptionQuizComponent,setDisplayOptionQuizComponent]=useState(true)
    const [answerValue,setAnswerValue]=useState(initialAnswerValue)
    useEffect(()=>{
        dispatch(display(displayOptionQuizComponent))
    },[displayOptionQuizComponent])
    useEffect(()=>{
        setAnswerValue(createQuiz.ansewrs[createQuiz.currentIndex]?.question || "")
    },[createQuiz.currentIndex,createQuiz.etat,createQuiz])
    useEffect(() => {
        getUser();
      }, []);
    
      async function getUser() {
        await api.get("/api/v1/user").then((response)=>{
            setIsLogin(true)
        }).catch((error)=>{
            if (error.response.status === 401) {
                setIsLogin(false)
        
            }
        })
      }
      if(!isLogin){
        navigate("/login",{ replace: true })
        return;
      }
    return<>
        <div>
            <nav className="bg-white">
                <NavBarComponent />
            </nav>

            <main className='createquiz'>
                <section className='diapositive'>
                    <DiapositiveComponent />
                </section>

                <section className='generatequiz'>
                    <div className='Question'>
                        <input value={answerValue} onChange={(e)=>{setAnswerValue(e.target.value);dispatch(update_answer(e.target.value))}} className="shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-center mt-20 py-5 text-xl" maxLength={120} id="username" type="text" placeholder="add a question"/>
                        <div className='affiche-menu' onClick={()=>{dispatch(showing(true))}}><CiMenuKebab/></div>
                    </div>
                    <div className='option-question'>
                        <FormQuestionComponent quiz={typequiz} />
                    </div>
                </section>

                <section className='btn-display'>
                    <button className='btn-click' onClick={()=>{setDisplayOptionQuizComponent(()=>!displayOptionQuizComponent);dispatch(showing(false))}}>{showingData.display?<IoIosArrowForward/>:<IoIosArrowBack/>}</button>
                </section>

                <section className='optionquiz' style={{"display":showingData.display?"block":"none"}}>
                        <OptionQuizComponent />
                </section>

                <section className='optionquiz' style={{"display":showingData.show?"block":"none"}}>
                        <OptionQuizComponent />
                </section>
            </main>
        </div>
    </>
}

export default CreateQuizPage