// ParticipantScore.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantScore = () => {
  const navigate = useNavigate();


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg">
        <p className="mb-4 text-2xl font-semibold">Your Score: 100</p>
      </div>
    </div>
  );
};

export default ParticipantScore;
