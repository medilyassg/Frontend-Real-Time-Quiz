import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import {ReactNotifications} from 'react-notifications-component';

const QuizNicknameEntry = () => {
  const [nickname, setNickname] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    
      showNotification("Success!","The room exists! Please enter your nickname to join.", 'success');
    
  },[]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleValidation = () => {
    // Perform validation logic if needed
    console.log(`Validating nickname: ${nickname}`);
    if(nickname==""){
      showNotification('Oops!',"Oops ! You must enter a nickname before you can play", 'danger');

    }
  };

  const showNotification = (title,message, type) => {
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b bg-gradient-to-tr from-blue-400 to-cyan-200">
      <ReactNotifications />
      <div
        className={`bg-white p-8 rounded-md shadow-md transform transition-transform mt-auto ${
          isHovered ? 'scale-110' : 'scale-100'
        } transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">QuizzMinds</h1>
        <div className="mb-4">
          <input
            type="text"
            id="quizNickname"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="Your Nickname"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 text-center placeholder-center mb-4"
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
      <footer className="text-center text-gray-500 mt-auto">
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
  );
};

export default QuizNicknameEntry;
