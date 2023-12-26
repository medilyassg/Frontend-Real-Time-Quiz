import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Player from './Player';
import echo from '../../../config/echo'
import { api } from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

const PlayerWaitingRoom = () => {
  const roomId = new URLSearchParams(location.search).get('roomId');
  const navigate = useNavigate();

  const [players, setPlayers] = useState([])
    
  const shareMessage = `Join my quiz room on QuizzMinds! Room Code: ${roomId} - quizzminds.com`;

  const animationStyle = `
    @keyframes dots {
      0%, 20% {
        content: '.';
      }
      40% {
        content: '. .';
      }
      60% {
        content: '. . .';
      }
      80%, 100% {
        content: '';
      }
    }
    .animate-dots::after {
      content: '';
      display: inline-block;
      animation: dots 1.5s infinite steps(1);
    }
  `;

  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (gameStarted && countdown >= 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }else if(countdown<0){
      navigate(`/ParticipantSession?roomId=${roomId}`)
    }
    
    return () => clearInterval(timer);
    
  }, [gameStarted, countdown]);
  useEffect(() => {
    echo.channel('quiz-started').listen('QuizStarted', (data) => {
      console.log('Received data:', data);
      setGameStarted(true)
      
    });
    
  }, []);

  useEffect(() => {
    

    echo.channel('player-join-room').listen('PlayerJoined', (data) => {
      console.log('Received data:', data);
      setPlayers((prevPlayers) => [...prevPlayers, { id: 1, nickname: data.nickname }]);

    });

    const getPlayers = async () => {
      try {
        const response = await api.post('/api/v1/get-players', { pin: roomId });

        if (response.status === 200) {
          setPlayers(response.data.players);
        } else {
          console.error('Error fetching players:', response.status);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    // Call the getPlayers function when the component mounts
    getPlayers();

    
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200 relative">
      {gameStarted && countdown >= 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-75 z-50 flex items-center justify-center">
          <div className="text-white text-6xl font-bold">
            {countdown === 0 ? 'Gooooooo!' : countdown}
          </div>
        </div>
      )}

      <div className="bg-white p-8 border border-blue-900 rounded-md shadow-md w-full max-w-full m-3 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <QRCode value={`http://localhost:3000/code?id=${roomId}`} size={70} />
        </div>

        <div className="mb-4">
          <h2 className="text-1xl font-bold text-blue-500">Room ID: {roomId}</h2>
        </div>

        <div className="p-6 rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Get Ready!</h2>
          <style>{animationStyle}</style>
          <p className="text-2xl">
           
          The game is about to begin <span className="animate-dots text-2xl"></span>
              
          </p>
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {players && players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>

        <p className="mb-6 text-gray-700 text-center">
          Invite more players to join the game. The more, the merrier!
        </p>

        <div className="flex items-center justify-center space-x-4">
        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="text-green-600">
              <FaWhatsapp size={32} />
            </a>
            <a href={`https://www.instagram.com/?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="text-pink-600">
              <FaInstagram size={32} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('quizzminds.com')}&quote=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              <FaFacebook size={32} />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`} target="_blank" rel="noopener noreferrer" className="text-blue-400">
              <FaTwitter size={32} />
            </a>
        </div>
      </div>
    </div>
  );
};

export default PlayerWaitingRoom;
