import { useEffect, useState } from 'react';
import { api } from '../../../config/axios';
import QuizResults from './QuizResults';

const ScoreTable = () => {
  const roomCode = new URLSearchParams(location.search).get('roomId');
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.post('/api/v1/get-data-quiz-session', { "pin": roomCode });
        return response.data
      } catch (error) {
        console.log('Error message:', error.response ? error.response.data.message : error.message);
      }
    };

    getData().then((response)=>{
      if(response.data.score){
        setParticipants(()=>{
          return response.data.score
        })
      }
      
    });
  }, []);


  return (
    <div className="App">
      <QuizResults participants={participants} />
    </div>
  );
};

export default ScoreTable;
