import './index.css';
import { api } from '../config/axios';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    getUser();
  }, [])
  async function getUser(){
    const csrf=await api.get('/sanctum/csrf-cookie')

    console.log('csrf : ',csrf)

    const login = await api.post('/api/v1/auth/login',{
      email:'jovani24@example.com',
      password:'password'
    })

    console.log('login : ',login)

    const user=await api.get('/api/v1/user')
    console.log('user : ',user)
  }
  return <>
    <h1 className="text-3xl font-bold underline bg-red-600">
      Hello world!
    </h1>
  </>
}

export default App
