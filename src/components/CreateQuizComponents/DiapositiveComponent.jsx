import { RiErrorWarningFill } from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { add_ansewr,change_current_index, remove_element } from "../../store/createQuizReducer";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DiapositiveComponent=()=>{
    const dispatch=useDispatch()
    const createQuizData=useSelector(state=>state.createQuizData)
    function verificationFiled(){
        for (const item of createQuizData.ansewrs) {
            if (
                item.question === "" ||
                item.type === "" ||
                item.temp === "" ||
                item.point === "" ||
                item.limitdereponse === "" ||
                item.response.some((responseItem) => responseItem.reponseOne === "" || responseItem.reponseTwo === "" || responseItem.reponseThree === "" || responseItem.reponseFour === "") ||
                item.response.every((responseItem) => responseItem.correct === false)
            ) {
                return false
            }
        }
        return true;
    }
    function handleElementClickCurrentIndex(index){
        dispatch(change_current_index(index))
    }
    function removeElement(index){
        if(createQuizData.ansewrs.length==1){
            toast.warning("Cet élément ne peut pas être supprimé")
        }else{
            dispatch(remove_element(index))
        }
    }
    return<>
        <div className="diapositive-section">
            {createQuizData.ansewrs.map((item,index)=>{
                return<>
                <div key={index} className="diapositive-item" onClick={()=>handleElementClickCurrentIndex(index)} style={{ "backgroundColor":createQuizData.currentIndex==index?"#EAF4FC":"" }}>
                    <div className="btn-diapositive">
                        <div className="warning" style={{ "display":verificationFiled()?"none":"block" }}><RiErrorWarningFill /></div>
                        <div className="duplicate" onClick={()=>dispatch(add_ansewr({question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
                        {reponseOne:"",correct:false},{reponseTwo:"",correct:false},{reponseThree:"",correct:false},{reponseFour:"",correct:false}
                        ]}))}><HiDuplicate /></div>
                        <div className="trash" onClick={()=>removeElement(index)}><FaTrashAlt /></div>
                    </div>

                    <div className="screen-diapositive">
                        <div>Quiz {index+1}</div>
                    </div>
                </div>
                </>
            })}

        </div>
        <div className="btn-ajouter-question">
            <div onClick={()=>dispatch(add_ansewr({question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
                        {reponseOne:"",correct:false},{reponseTwo:"",correct:false},{reponseThree:"",correct:false},{reponseFour:"",correct:false}
                        ]}))} className="px-2 py-2 font-bold text-white bg-blue-500 rounded-md rounded-r hover:bg-blue-700 btn-responcive1">Ajouter question</div>
            <div onClick={()=>dispatch(add_ansewr({question:"",type:"",temp:"",point:"",limitdereponse:"",response:[
                        {reponseOne:"",correct:false},{reponseTwo:"",correct:false},{reponseThree:"",correct:false},{reponseFour:"",correct:false}
                        ]}))} className="px-4 py-4 font-bold text-white bg-blue-500 rounded-md rounded-r hover:bg-blue-700 btn-responcive2"><FaPlus /></div>
        </div>
        <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
    </>
}

export default DiapositiveComponent