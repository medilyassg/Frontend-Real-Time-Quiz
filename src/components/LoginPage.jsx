import { api } from '../../config/axios';
import { useEffect } from 'react';
import { useDispatch,useSelector } from "react-redux";
import {addAuthData,isLogin} from '../store/authDataReducer'

const LoginPage=()=>{
    // const dispatch=useDispatch();
    // let dataUser=useSelector(state=>state);
    
    // useEffect(() => {
    //     getUser();
    //   }, [])
      
    //   async function getUser(){
    //     const csrf=await api.get('/sanctum/csrf-cookie')
    
    //     const login = await api.post('/api/v1/auth/login',{
    //       email:'jovani24@example.com',
    //       password:'password'
    //     })
    
    //     const user=await api.get('/api/v1/user')
    //     if(user.status>=200 && user.status<300){
    //         dispatch(addAuthData(user.data.data))
    //         dispatch(isLogin())
    //     }
    //   }
    //   console.log(dataUser)
      
      return <>
        <h1 className="text-3xl font-bold underline bg-red-600">
          Hello world!
        </h1>
      </>
}

export default LoginPage