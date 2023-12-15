
import Avatar from 'react-avatar';
import { RiRadioButtonLine } from 'react-icons/ri';

const Player = ({ player }) => {
    const animationStyle = `
    @keyframes bounceAnimation {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-20px);
        }
        60% {
          transform: translateY(-10px);
        }
      }
      
      .animate-bounce {
        animation: bounceAnimation 1s;
      }
    
  `;
    return (
        <div key={player.id} className="bg-blue-100 p-4 rounded-md flex items-center border border-blue-900 animate-bounce">
            <style>{animationStyle}</style>
            <Avatar
                name={player.nickname}
                size="48"
                round={true}
                className="mr-4"
            />
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{player.nickname}</h3>
                <p className="text-gray-600 flex items-center"> <RiRadioButtonLine className="text-green-600 mr-2" />Online</p>
            </div>
        </div>
    );
};

export default Player;
