import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import echo from '../../../config/echo';
import {api} from '../../../config/axios'
const ParticipantScore = () => {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const navigate=useNavigate()
  const [changeScore,setChangeScore]=useState(null)
  const [currentIndex,setCurrentIndex]=useState(null)
  const roomCode = new URLSearchParams(location.search).get('roomId');
  useEffect(()=>{
    if(getCookie("Resultat")=="0"){
      const changeScore=async()=>{
        let responseData=await api.post('/api/v1/change-score',{"pin":roomCode,"nickname":getCookie("nickname"),"score":0})
        return responseData.data
      }
      changeScore().then((response)=>{
        if(response.data){
          document.cookie = "Resultat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
      }).catch((e)=>{
        console.log('Error message:', e.response.data);
      })
    }
    echo.channel(`next-question-${roomCode}`).listen('NextQuestion', (data) => {
      if(data.state=="finish"){
        navigate(`/score?roomId=${roomCode}`)
      }
      if(data.state=="next"){
        navigate(`/ParticipantSession?roomId=${roomCode}`)
      }
    });
    const getData=async()=>{
      let response=await api.post('/api/v1/get-time',{"pin":roomCode})
      return response.data
    }
    getData().then((response)=>{
      setCurrentIndex(()=>{
        return response.data.index
      })
    }).catch((e)=>{
      console.log('Error message:', e.response.data);
    })
  },[])

  useEffect(()=>{
    const getScoreOfPlayer=async()=>{
      let response=await api.post('/api/v1/get-score-of-player',{"pin":roomCode,"nickname":getCookie("nickname")})
      return response.data
    }
    getScoreOfPlayer().then((response)=>{
      console.log(response.score)
      let score=null;
      if(currentIndex==response.score.length-1){
        score=response.score[response.score.length-1]
      }else{
        if(response.score.length==1 || response.score.length==2){
          score=response.score[0];
        }
        if(response.score.length%2!=0 || response.score.length%2==0){
          if(response.score[response.score.length-2]==10 && response.score[response.score.length-1]==0){
            score=10
          }
          if(response.score[response.score.length-2]==0 && response.score[response.score.length-1]==10){
            score=10
          }
          if(response.score[response.score.length-2]==0 && response.score[response.score.length-1]==0){
            score=0
          }
        }
      }
      setChangeScore(()=>{
        return score
      })
      
    }).catch((e)=>{
      console.log('Error message:', e.response.data);
    })
  },[currentIndex])

  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg">
        <p className="mb-4 text-2xl font-semibold">Your Score: {changeScore==null?"":changeScore}</p>
      </div>
    </div>
  );
};

export default ParticipantScore;
