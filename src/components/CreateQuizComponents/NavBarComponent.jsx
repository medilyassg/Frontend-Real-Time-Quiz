import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { update_nom_quiz } from "../../store/createQuizReducer"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBarComponent=()=>{
    const dispatch=useDispatch()
    const [nomQuiz,setNomQuiz]=useState()
    const navigate=useNavigate()
    const createQuiz=useSelector(state=>state.createQuizData)
    function enregister(){
        if(createQuiz.nomQuiz==""){
            toast.warning("Complétez votre quiz")
            return;
        }
        createQuiz.ansewrs.forEach(item => {
            if(item.question!=""&&
                item.type!=""&&
                item.temp!=""&&
                item.point!=""&&
                item.limitdereponse!=""&&
                item.response[0].reponseOne!=""&&
                item.response[1].reponseTwo!=""&&
                item.response[2].reponseThree!=""&&
                item.response[3].reponseFour!=""){
            let counter =0
            item.response.forEach(item => {
                if(item.correct==true){
                    counter++
                }
            });
            if(counter==0){
                toast.warning("Complétez votre quiz")
                return;
            }
            console.log(createQuiz)
            return;
        }
        toast.warning("Complétez votre quiz")
        });
    }
    return <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    </div>
                    <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                        <p className="text-2xl font-bold text-blue-700">QuizMinds</p>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4 w-96">
                        <input value={nomQuiz} onChange={(e)=>{setNomQuiz(e.target.value);dispatch(update_nom_quiz(e.target.value))}} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-52" id="username" type="text" placeholder="Nom du Quiz" />
                        </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div className="inline-flex btnNavBar">
                <button onClick={()=>navigate("/home")} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-l shadow">
                    Quitter
                </button>
                <button onClick={()=>enregister()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    Enregistrer
                </button>
                </div>
                    </div>
                    </div>
                </div>

                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nom du Quiz" />
                    </div>
        </div>
    </>
}

export default NavBarComponent