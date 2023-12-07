// ParticipantQuizSession.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { IoTriangle } from 'react-icons/io5';
import { FaCircle } from 'react-icons/fa6';
import { RiRectangleFill } from 'react-icons/ri';

const ParticipantQuizSession = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const navigate = useNavigate();

  const handleAnswerClick = (index) => {
    // Check if a response is already selected, and ignore the click if it is
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(index);
    setShowResult(true);
    setIsAnswerCorrect(true);
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      setTimer(15);
      navigate('/ParticipantWaiting');
    }, 2000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    // Launch the waiting page after the timer reaches 0
    if (timer === 0) {
      clearInterval(interval);
      navigate('/ParticipantWaiting');
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer, navigate]);

  const answerColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
  const answerIcons = [<FaStar size={32} />, <IoTriangle size={32} />, <FaCircle size={32} />, <RiRectangleFill size={32} />];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <div className="grid grid-cols-2 gap-4">
          {answerIcons.map((icon, index) => (
            <div
              key={index}
              className={`p-4 text-4xl font-bold rounded-md ${answerColors[index]} text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                selectedAnswer === index ? 'border-2 border-black' : 'border-2 border-transparent'
              }`}
              onClick={() => handleAnswerClick(index)}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 mb-2">
                  {icon}
                </div>
                <div>{String.fromCharCode(65 + index)}</div>
              </div>
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
