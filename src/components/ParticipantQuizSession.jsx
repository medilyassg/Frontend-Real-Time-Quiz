// ParticipantQuizSession.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantQuizSession = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const navigate = useNavigate();

  const handleAnswerClick = (answer) => {
    // Check if a response is already selected, and ignore the click if it is
    if (selectedAnswer !== null) {
      return;
    }

    setSelectedAnswer(answer);
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

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">

        <div className="grid grid-cols-2 gap-4">
          {['A', 'B', 'C', 'D'].map((answer, index) => (
            <div
              key={index}
              className={`p-4 text-4xl font-bold rounded-md ${
                answerColors[index]} ${selectedAnswer === answer ? 'selected-answer' : ''
              } text-white`}
              onClick={() => handleAnswerClick(answer)}
              style={{ cursor: 'pointer', textAlign: 'center' }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 mb-2">
                {answer}
              </div>
              {answer}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xl font-bold text-center">Time remaining: {timer}s</p>
        </div>

        {/* Show result for participant */}
        {showResult && (
          <div className="mt-4">
            {/* You can customize this part based on your design requirements */}
            {/* For now, it won't show if the answer is correct or incorrect */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParticipantQuizSession;
