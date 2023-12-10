// ParticipantWaiting.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.scss';

const ParticipantWaiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/ParticipantScore');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="loader"></div>
    </div>
  );
};

export default ParticipantWaiting;
