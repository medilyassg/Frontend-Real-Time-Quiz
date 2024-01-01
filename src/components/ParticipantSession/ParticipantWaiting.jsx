// ParticipantWaiting.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DotLoading from '../JoinGameComponents/DotLoading'
import echo from '../../../config/echo';

const ParticipantWaiting = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  const navigate=useNavigate()
  useEffect(()=>{
    document.cookie = "Resultat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    echo.channel(`quiz-session-${roomCode}`).listen('QuestionTime', (data) => {
      navigate(`/ParticipantScore?roomId=${roomCode}`,{ replace: true })
      
    });
    },[])
  return (
    <DotLoading/>
  );
};

export default ParticipantWaiting;
