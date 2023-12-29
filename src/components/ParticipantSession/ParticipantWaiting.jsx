// ParticipantWaiting.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DotLoading from '../JoinGameComponents/DotLoading'
import echo from '../../../config/echo';

const ParticipantWaiting = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  const navigate=useNavigate()
  useEffect(()=>{
    echo.channel(`quiz-session-${roomCode}`).listen('QuestionTime', (data) => {
      navigate(`/ParticipantScore?roomId=${roomCode}`)
      
    });
    },[])
  return (
    <DotLoading/>
  );
};

export default ParticipantWaiting;
