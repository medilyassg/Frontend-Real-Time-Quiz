import QRCode from 'react-qr-code';
import {FaShare, FaWhatsapp, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Player from './Player';

const WaitingRoom = () => {
  const roomId = '444'; // Replace with your actual room ID

  const players = [
    { id: 1, nickname: 'Player1' },
    { id: 2, nickname: 'ilayer2' },
    { id: 3, nickname: 'Player3' },
    { id: 4, nickname: 'Player4' },
    { id: 5, nickname: 'Player5' },
    { id: 5, nickname: 'Player5' },
    { id: 5, nickname: 'Player5' },
    { id: 5, nickname: 'Player5' },
    // Add more players as needed
  ];

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200">
      <div className="bg-white p-8 border border-blue-900 rounded-md shadow-md w-full max-w-full m-3 relative">

        {/* QR Code in Top Right */}
        <div className="absolute top-0 right-0 mt-4 mr-4">
        <QRCode value={`http://localhost:3000/code?id=${roomId}`}    size={70}
 />
        </div>

        {/* Room ID and Title */}
        <div className="mb-4">
          <h2 className="text-1xl font-bold text-blue-500">Room ID: {roomId}</h2>
        </div>

        {/* Game Start Message */}
        <div className="p-6 rounded-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Get Ready!</h2>
          <style>{animationStyle}</style>
          <p className="text-2xl">
            The game is about to begin <span className="animate-dots text-2xl"></span>
          </p>
        </div>

        {/* Player List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {players.map((player) => (
                        <Player key={player.id} player={player} />

          ))}
        </div>

        <p className="mb-6 text-gray-700 text-center">
          Invite more players to join the game. The more, the merrier!
        </p>

        {/* Share Zone */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-4">
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
    </div>
  );
};

export default WaitingRoom;
