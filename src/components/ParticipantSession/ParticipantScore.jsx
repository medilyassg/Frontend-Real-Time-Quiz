// ParticipantScore.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipantScore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/ParticipantSession');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <p className="text-2xl font-semibold mb-4">Your Score: 100</p>
      </div>
    </div>
  );
};

export default ParticipantScore;
