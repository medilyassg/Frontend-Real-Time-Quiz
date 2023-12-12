import { TbMessage2Question } from "react-icons/tb";
import { MdOutlineQuiz,MdAccessTime } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { RiApps2Line } from "react-icons/ri";
import { HiMiniXMark } from "react-icons/hi2"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { display, showing } from "../../store/displayComponentReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add_ansewr, remove_element, update_limitdereponse, update_point, update_temp, update_type } from "../../store/createQuizReducer";

const OptionQuizComponent=()=>{
    const dispatch=useDispatch()
    const createQuizData=useSelector(state=>state.createQuizData)
    const type_quiz = createQuizData.ansewrs[createQuizData.currentIndex]?.type || "";
    const temp_quiz = createQuizData.ansewrs[createQuizData.currentIndex]?.temp || "";
    const point_quiz = createQuizData.ansewrs[createQuizData.currentIndex]?.point || "";
    const limit_question = createQuizData.ansewrs[createQuizData.currentIndex]?.limitdereponse || "";
    const [typequestionquiz,setQuestiontypeQuiz]=useState(type_quiz)
    const [tempsquiz,setTempsquiz]=useState(temp_quiz)
    const [pointquiz,setPointquiz]=useState(point_quiz)
    const [limitquestion,setLimitquestion]=useState(limit_question)
    function removeElement(index){
        if(createQuizData.ansewrs.length==1){
            toast.warning("Cet élément ne peut pas être supprimé")
        }else{
            dispatch(remove_element(index))
        }
    }
    useEffect(()=>{
        if (createQuizData.ansewrs && createQuizData.ansewrs[createQuizData.currentIndex]) {
            setQuestiontypeQuiz(createQuizData.ansewrs[createQuizData.currentIndex].type);
            setTempsquiz(createQuizData.ansewrs[createQuizData.currentIndex].temp);
            setPointquiz(createQuizData.ansewrs[createQuizData.currentIndex].point);
            setLimitquestion(createQuizData.ansewrs[createQuizData.currentIndex].limitdereponse);
        }
    },[createQuizData.currentIndex])
    return<>
        <div className='align-optionquiz'>
                    <div className='cache-meny' onClick={()=>{dispatch(showing(false));dispatch(display(false))}}>
                    <HiMiniXMark />
                    </div>
                        <div className="mx-auto max-w-xs">
                        <label htmlFor="example6" className="mb-1 block text-sm font-medium text-white flex py-4"><TbMessage2Question /><span className='px-2 text-xl'>Type de question</span></label>
                        
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5">
                            <MdOutlineQuiz />
                            </div>
                            <select value={typequestionquiz} onChange={(e)=>{setQuestiontypeQuiz(e.target.value);dispatch(update_type(e.target.value))}} id="example6" className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 py-2">
                            <option value="">sélectionné</option>
                            <option value="quiz">Quiz</option>
                            </select>
                        </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                        <label htmlFor="example6" className="mb-1 block text-sm font-medium text-white flex py-4"><MdAccessTime /><span className='px-2 text-xl'>Temps imparti</span></label>
                        <div className="relative">
                            <select value={tempsquiz} onChange={(e)=>{setTempsquiz(e.target.value);dispatch(update_temp(e.target.value))}} id="example6" className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 py-2">
                            <option value="">sélectionné</option>
                            <option value="5s">5 secondes</option>
                            <option value="10s">10 secondes</option>
                            <option value="20s">20 secondes</option>
                            <option value="30s">30 secondes</option>
                            <option value="1m">1 minutee</option>
                            <option value="1m30s">1 minute 30 secondes</option>
                            <option value="2m">2 minutes</option>
                            <option value="3m">3 minutes</option>
                            <option value="4m">4 minutes</option>
                            </select>
                        </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                        <label htmlFor="example6" className="mb-1 block text-sm font-medium text-white flex py-4"><FaRegStar /><span className='px-2 text-xl'>Points</span></label>
                        <div className="relative">
                            <select value={pointquiz} onChange={(e)=>{setPointquiz(e.target.value);dispatch(update_point(e.target.value))}} id="example6" className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 py-2">
                            <option value="">sélectionné</option>
                            <option value="standard">Standard</option>
                            </select>
                        </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                        <label htmlFor="example6" className="mb-1 block text-sm font-medium text-white flex py-4"><RiApps2Line /><span className='px-2 text-xl'>Limite de réponse</span></label>
                        <div className="relative">
                            <select value={limitquestion} onChange={(e)=>{setLimitquestion(e.target.value);dispatch(update_limitdereponse(e.target.value))}} id="example6" className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 py-2 mb-8">
                            <option value="">sélectionné</option>
                            <option value="unique">Sélection unique</option>
                            </select>
                        </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <button onClick={()=>removeElement(createQuizData.currentIndex)} className="rounded-l border border-red-500 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300">
                                Supprimer
                            </button>
                            <button onClick={()=>dispatch(add_ansewr({question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
                            {reponseOne:"",correct:false},{reponseTwo:"",correct:false},{reponseThree:"",correct:false},{reponseFour:"",correct:false}
                            ]}))} className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-r">
                                Dupliquer
                            </button>
                        </div>
                    </div>

                    
    </>
}

export default OptionQuizComponent