// ParticipantWaiting.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './loader.scss';
import echo from '../../../config/echo';

const ParticipantWaiting = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  const navigate=useNavigate()
  useEffect(()=>{
    console.log(roomCode)
    echo.channel(`quiz-session-${roomCode}`).listen('QuestionTime', (data) => {
      console.log(data)
      navigate(`/ParticipantScore?roomId=${roomCode}`)
      
    });
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="loader"></div>
    </div>
  );
};

export default ParticipantWaiting;
