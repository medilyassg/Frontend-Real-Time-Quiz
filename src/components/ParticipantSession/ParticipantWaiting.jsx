// ParticipantWaiting.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.scss';
import echo from '../../../config/echo';

const ParticipantWaiting = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  useEffect(()=>{
    echo.channel(`quiz-session-${roomCode}`).listen('QuestionTime', (data) => {
      console.log('Received data:', data);
      
    });
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="loader"></div>
    </div>
  );
};

export default ParticipantWaiting;
