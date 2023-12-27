// ParticipantQuizSession.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';
import echo from '../../../config/echo';
import { api } from '../../../config/axios';

const ParticipantQuizSession = () => {
  const initialQuestions = [
    {
      question: '',
      correctAnswer: '',
      answers: ['', '', '', ''],
    }
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const roomCode = new URLSearchParams(location.search).get('roomId');
  const navigate = useNavigate();

  useEffect(()=>{
    echo.channel(`quiz-session-${roomCode}`).listen('QuestionTime', (data) => {
      if(data.data.time==0){
        // navigate(`/ParticipantScore?roomId=${roomCode}`)
      }
      
    });
    const getTime=async()=>{
      let response=await api.post('/api/v1/get-time',{"pin":roomCode})
      return response.data
    }
    getTime().then((response)=>{
      setCurrentQuestionIndex(response.data.index)
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


  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) {
      return;
    }
    // setCurrentQuestionIndex((prevState)=>prevState+1)
    setSelectedAnswer(index);
    if(questions[currentQuestionIndex].correctAnswer==questions[currentQuestionIndex].answers[index]){
      console.log("Your score is : "+10)
    }else{
      console.log("Your score is : "+0)
    }
    // navigate(`/ParticipantWaiting?roomId=${roomCode}`)
  };



  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={24} />, <IoTriangle size={24} />, <FaCircle size={24} />, <RiRectangleFill size={24} />];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg">
        {/* Question outside the box */}
        <div className="grid grid-cols-2 gap-4">
          {answerIcons.map((icon, index) => (
            <div
              key={index}
              className={`flex items-center p-4 text-lg font-bold rounded-md ${answerColors[index]} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                selectedAnswer === index ? 'border-2 border-black' : 'border-2 border-transparent'
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              <div className={`rounded-full h-12 w-12 flex items-center justify-center mr-4 ${selectedAnswer === index ? 'bg-gray-200' : ''}`}>
                {icon}
              </div>
              <div>{questions[currentQuestionIndex].answers[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantQuizSession;
