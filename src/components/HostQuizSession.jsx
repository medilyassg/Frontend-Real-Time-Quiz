// HostQuizSession.jsx
import React, { useState, useEffect } from 'react';

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
      question: "What is the capital of France?",
      correctAnswer: "Paris",
      answers: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      question: "What is the capital of Uruguay?",
      correctAnswer: "Montevideo",
      answers: ["Berlin", "Montevideo", "Paris", "Rome"],
    },
  ];

  const [questions, setQuestions] = useState(shuffleArray(initialQuestions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(15);

  const handleNextQuestion = () => {
    setTimer(15);

    if (currentQuestionIndex === questions.length - 1) {
      console.log("Quiz ended");
      // Stop the game or redirect to another page
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
        {/* Question outside the box */}
        <h2 className="text-4xl font-bold mb-4 text-center">
          Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <div
              key={index}
              className={`p-4 text-4xl font-bold rounded-md ${answerColors[index]} text-white`}
            >
              {String.fromCharCode(65 + index)} - {answer}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold text-center">Time remaining: {timer}s</p>
        </div>

        {/* Host controls */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="py-2 px-4 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
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
