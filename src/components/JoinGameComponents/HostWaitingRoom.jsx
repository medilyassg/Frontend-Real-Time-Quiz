import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Player from './Player';
import echo from '../../../config/echo';
import { api } from '../../../config/axios';
import { useNavigate } from 'react-router-dom';

const HostWaitingRoom = () => {
  const roomId = new URLSearchParams(location.search).get('roomId');
  const quizId = new URLSearchParams(location.search).get('quizId');
  const navigate = useNavigate();


  const [players, setPlayers] = useState([])

  const shareMessage = `Join my quiz room on QuizzMinds! Room Code: ${roomId} - quizzminds.com`;



  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    let timer;

    if (gameStarted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }else if(countdown==0){
      navigate(`/HostSession?roomId=${roomId}`)
    }

    return () => clearInterval(timer);
  }, [gameStarted, countdown]);

  const startGame = async () => {
    try {
      const response = await api.post('/api/v1/start-quiz', { pin: roomId ,quizId:quizId});

      if (response.status === 200) {
        console.log('Quiz started successfully');
        setGameStarted(true);
      } else {
        console.error('Error starting quiz:', response.status);
      }
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  }
  

  useEffect(() => {
    

    echo.channel('player-join-room').listen('PlayerJoined', (data) => {
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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200">
      {gameStarted && countdown >= 0 && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 opacity-75">
          <div className="text-6xl font-bold text-white">
            {countdown === 0 ? 'goooo!' : countdown}
          </div>
        </div>
      )}

      <div className="relative w-full max-w-full p-8 m-3 bg-white border border-blue-900 rounded-md shadow-md">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <QRCode value={`http://localhost:3000/code?id=${roomId}`} size={70} />
        </div>

        <div className="mb-4">
          <h2 className="font-bold text-blue-500 text-1xl">Room ID: {roomId}</h2>
        </div>

        <div className="p-6 text-center rounded-md">
          <h2 className="mb-4 text-3xl font-bold text-blue-500">QuizzMinds</h2>

          <button
            onClick={startGame}
            className="px-5 py-2 text-white transition-all duration-300 bg-blue-500 rounded-md w-36 hover:bg-blue-700"
          >
            Start
          </button>

        </div>

        <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 md:grid-cols-4">
          {players && players.map((player) => (
            <Player key={player.id} player={player} />
          ))}
        </div>

        <p className="mb-6 text-center text-gray-700">
          Invite more players to join the game. The more, the merrier!
        </p>

        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-4">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                shareMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600"
            >
              <FaWhatsapp size={32} />
            </a>
            <a
              href={`https://www.instagram.com/?text=${encodeURIComponent(
                shareMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600"
            >
              <FaInstagram size={32} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                'quizzminds.com'
              )}&quote=${encodeURIComponent(shareMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaFacebook size={32} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                shareMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <FaTwitter size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostWaitingRoom;
