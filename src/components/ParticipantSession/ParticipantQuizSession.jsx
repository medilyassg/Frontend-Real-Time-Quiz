// ParticipantQuizSession.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';

const ParticipantQuizSession = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) {
      return;
    }
    setCurrentQuestionIndex((prevState)=>prevState+1)
    setSelectedAnswer(index);
    navigate('/ParticipantWaiting')
  };



  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={24} />, <IoTriangle size={24} />, <FaCircle size={24} />, <RiRectangleFill size={24} />];

  const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['Berlin1', 'Madrid1', 'Paris1', 'Rome1'],
    },
    {
      question: 'What is the capital of Uruguay?',
      answers: ['Berlin2', 'Montevideo2', 'Paris2', 'Rome2'],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
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
