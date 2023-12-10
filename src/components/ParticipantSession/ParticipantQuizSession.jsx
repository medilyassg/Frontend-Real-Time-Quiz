// ParticipantQuizSession.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';

const ParticipantQuizSession = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    if (timer === 0 || selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Launch the waiting page after the timer reaches 0
    if (timer === 0 && selectedAnswer !== null) {
      clearInterval(interval);
      navigate('/ParticipantWaiting');
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, navigate, selectedAnswer]);

  useEffect(() => {
    // Disable navigation until the timer runs out
    const timeoutNavigation = setTimeout(() => {
      navigate('/ParticipantWaiting');
    }, timer * 1000);

    return () => {
      clearTimeout(timeoutNavigation);
    };
  }, [timer, navigate]);

  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={24} />, <IoTriangle size={24} />, <FaCircle size={24} />, <RiRectangleFill size={24} />];

  const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    },
    {
      question: 'What is the capital of Uruguay?',
      answers: ['Berlin', 'Montevideo', 'Paris', 'Rome'],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
        {/* Question outside the box */}
        <h2 className="text-3xl font-bold mb-4 text-center">
          Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
        </h2>
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
        <div className="mt-4">
          <p className="text-xl font-bold text-center">Time remaining: {timer}s</p>
        </div>
      </div>
    </div>
  );
};

export default ParticipantQuizSession;
