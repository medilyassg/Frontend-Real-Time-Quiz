import { useState, useEffect } from 'react';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { ReactNotifications } from 'react-notifications-component';
import DotLoading from './DotLoading';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from "../../../config/axios";
import Swal from 'sweetalert2'

const QuizNicknameEntry = () => {
  const [nickname, setNickname] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const roomCode = new URLSearchParams(location.search).get('pin');
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  useEffect(() => {
    if (!roomCode) {
      // Handle the case where the room code is missing from the URL
      navigate('/');
    } else {
      // Room code exists, you can perform additional logic if needed
      showNotification("Success!", "The room exists! Please enter your nickname to join.", 'success');
    }
  }, [roomCode, navigate]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleValidation = () => {
    if (nickname === "") {
      showNotification('Oops!', "Oops ! You must enter a nickname before you can play", 'danger');
    } else {
      setIsLoading(true);

      // Send a request to join the room with the provided nickname
      api.post('/api/v1/join-room', { pin: roomCode, nickname: nickname })
        .then((response) => {
          // Navigate to the waiting room or another appropriate page
          if(response.data.message){
            setCookie("nickname",nickname,1)
            navigate(`/waiting?roomId=${roomCode}`);
          }
          if(response.data.error){
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data.error,
            });
          }
        })
        .catch((e) => {
          console.log('Error message:', e.response.data.message);
          showNotification('An error occurred while joining the room. Please try again.', 'danger');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const showNotification = (title, message, type) => {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  return (
    <>
      {isLoading ? <DotLoading /> :
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200">
          <ReactNotifications />
          <div
            className={`bg-white p-8 rounded-md shadow-md transform transition-transform mt-auto ${
              isHovered ? 'scale-110' : 'scale-100'
            } transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1 className="mb-6 text-3xl font-bold text-center text-blue-500">QuizzMinds</h1>
            <div className="mb-4">
              <input
                type="text"
                id="quizNickname"
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="Your Nickname"
                className="w-full px-3 py-2 mb-4 text-center placeholder-center transition-all duration-300 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleValidation}
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${
                isHovered ? 'animate-bounce' : ''
              }`}
            >
              {isHovered ? 'OK, Go!' : 'Go!'}
            </button>
          </div>
          <footer className="mt-auto text-center text-gray-500">
            <p>
              Create your own quiz for free on{' '}
              <a href="https://quizzminds.com" className="underline" target="_blank" rel="noopener noreferrer">
                QuizzMinds.com
              </a>
              .
            </p>
            <p>&copy; 2023 QuizzMinds. All rights reserved.</p>
          </footer>
        </div>
      }
    </>
  );
};

export default QuizNicknameEntry;
