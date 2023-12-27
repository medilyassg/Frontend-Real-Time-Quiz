// HostQuizSession.jsx
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';
import { api } from '../../../config/axios';


const HostQuizSession = () => {
  const initialQuestions = [
    {
      question: '',
      correctAnswer: '',
      answers: ['', '', '', ''],
    }
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(null);
  const [changeTime,setChangeTime]=useState(null)
  const roomCode = new URLSearchParams(location.search).get('roomId');

  const handleTimeoutNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(()=>{
    const getTime=async()=>{
      let response=await api.post('/api/v1/get-time',{"pin":roomCode})
      return response.data
    }
    getTime().then((response)=>{
      console.log("index : "+response.data.index)
      setCurrentQuestionIndex(response.data.index)
      setTimer(response.data.time)
    }).catch((e)=>{
      console.log(e)
    })
    const getAllQuizzes=async()=>{
      let response=await api.post('/api/v1/allquiz',{"pin":roomCode})
      return response.data
    }
    getAllQuizzes().then((response)=>{
      setQuestions(response)
    }).catch((e)=>{
      console.log(e)
    })
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    const handleChangeTime=async()=>{
      let response=await api.post('/api/v1/change-time',{"pin":roomCode,"time":timer})
      return response.data
    }
    handleChangeTime().catch((e)=>{
      console.log(e)
    })
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={32} />, <IoTriangle size={32} />, <FaCircle size={32} />, <RiRectangleFill size={32} />];

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg">
      {/* Question outside the box */}
      <h2 className="mb-4 text-3xl font-bold text-center">
        Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {answerIcons.map((icon, index) => (
          <div
            key={index}
            className={`flex items-center p-4 text-lg font-bold rounded-md ${answerColors[index]} text-white`}
          >
            <div className="flex items-center justify-center w-12 h-12 mr-4 bg-gray-200 rounded-full">
              {icon}
            </div>
            <div>{questions[currentQuestionIndex].answers[index]}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold text-center">Time remaining: {timer !== null ? `${timer}s` : ""}</p>
      </div>
      {timer === 0 && (
        <div className="mt-4 text-center">
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
            onClick={handleTimeoutNextQuestion}
          >
            {currentQuestionIndex==questions.length-1?"Finish":"Next"}
          </button>
        </div>
      )}
    </div>
  </div>
  );
};

export default HostQuizSession;
