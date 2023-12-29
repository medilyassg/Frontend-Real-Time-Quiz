import { useEffect } from 'react';
import { api } from '../../../config/axios';
import QuizResults from './QuizResults'; 

const ScoreTable = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  useEffect(()=>{
    const getData=async()=>{
      let response =await api.post('/api/v1/get-time',{"pin":roomCode})
      return response.data
    }
    getData().then((response)=>{
      console.log(response.data.score)
    }).catch((e)=>{
      console.log('Error message:', e.response.data);
    })
  },[])
  const participants = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      results: [true, false, true],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      results: [true, true, false],
    },
   
   
  ];

  return (
    <div className="App">
      {/* <QuizResults participants={participants} /> */}
      <h1>Hello World</h1>
    </div>
  );
};

export default ScoreTable;
