import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../../../config/axios";
import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import DotLoading from './DotLoading'; // Assuming you have DotLoading component
import { Input } from '@nextui-org/react';

const QuizCodeEntry = () => {
  const [code, setCode] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleValidation = () => {
    if (code === '') {
      showNotification("Oops! You must enter a PIN before you can play", 'danger');
    } else {
      setIsLoading(true);

      // Check if the room exists
      api.post('/api/v1/room-exists', { pin: code })
        .then((response) => {
          if (response.data.exists) {
            showNotification('The room exists. Redirecting to nickname entry.', 'success');
            navigate(`/nickname?pin=${code}`);
          } else {
            showNotification('The PIN code was not recognized. Check that it is correct and try again.', 'danger');
          }
        })
        .catch((e) => {
          console.log('Error message:', e.response.data.message);
          showNotification('An error occurred while checking the room. Please try again.', 'danger');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  };

  const showNotification = (message, type) => {
    Store.addNotification({
      title: "Oops!",
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  };

  return (
    <>
      <ReactNotifications />
      {isLoading ? <DotLoading /> :

        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
          <div
            className={`bg-white p-8 rounded-md shadow-md transform transition-transform mt-auto w-1/4 ${
              isHovered ? 'scale-110' : 'scale-100'
            } transition-all duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1 className="mb-6 text-2xl font-bold text-center text-black">QuizzMinds</h1>
            <div className="mb-6">
            <Input value={code} onChange={handleCodeChange} type="text" variant="flat" label="Quiz code" size='sm' />
              {/* <input
                type="text"
                id="quizCode"
                value={code}
                onChange={handleCodeChange}
                placeholder="Quiz Code"
                className="w-full px-3 py-2 mb-4 text-center placeholder-center transition-all duration-300 border bg-slate-200 rounded-md focus:outline-none focus:border-blue-500"
              /> */}
            </div>
            <button
              onClick={handleValidation}
              className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ${
                isHovered ? 'animate-bounce' : ''
              }`}
              disabled={isLoading}
            >
              {isHovered ? 'Go!' : 'Validate'}
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

export default QuizCodeEntry;
