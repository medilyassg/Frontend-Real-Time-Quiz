// HostQuizSession.jsx
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const HostQuizSession = () => {
  const initialQuestions = [
    {
      question: 'What is the capital of France?',
      correctAnswer: 'Paris',
      answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    },
    {
      question: 'What is the capital of Uruguay?',
      correctAnswer: 'Montevideo',
      answers: ['Berlin', 'Montevideo', 'Paris', 'Rome'],
    },
  ];

  const [questions, setQuestions] = useState(shuffleArray(initialQuestions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(15);

  const handleTimeoutNextQuestion = () => {
    setTimer(15);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={32} />, <IoTriangle size={32} />, <FaCircle size={32} />, <RiRectangleFill size={32} />];

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
              className={`flex items-center p-4 text-lg font-bold rounded-md ${answerColors[index]} text-white`}
            >
              <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center mr-4">
                {icon}
              </div>
              <div>{questions[currentQuestionIndex].answers[index]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold text-center">Time remaining: {timer}s</p>
        </div>
        {/* Timeout Next Question button */}
        {timer === 0 && (
          <div className="mt-4 text-center">
            <button
              className="py-2 px-4 text-sm font-medium text-white rounded-lg bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={handleTimeoutNextQuestion}
            >
              Timeout: Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostQuizSession;
