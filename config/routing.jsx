import {createBrowserRouter} from 'react-router-dom'
import App from '../src/App/App'
import CreateQuizPage from '../src/components/CreateQuizPage'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'
import QuizCodeEntry from '../src/components/JoinGameComponents/QuizCodeEntry'
import QuizNicknameEntry from '../src/components/JoinGameComponents/QuizNicknameEntry'
import HostWaitingRoom from '../src/components/JoinGameComponents/HostWaitingRoom'
import PlayerWaitingRoom from '../src/components/JoinGameComponents/PlayerWaitingRoom'
import ScoreTable from '../src/components/JoinGameComponents/ScoreTable'
import HostQuizSession from '../src/components/HostSession/HostQuizSession'
import ParticipantQuizSession from '../src/components/ParticipantSession/ParticipantQuizSession'
import ParticipantWaiting from '../src/components/ParticipantSession/ParticipantWaiting'
import ParticipantScore from '../src/components/ParticipantSession/ParticipantScore'
import LoginFormPage from '../src/components/LoginFormPage'
import RegisterPage from '../src/components/RegisterPage'

const routes=createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                index:true,
                element:<HomePage />
            },
            {
                path:"creator",
                element:<CreateQuizPage />
            },{
                path:"codeentry",
                element:<QuizCodeEntry />
            },
            {
                path:"nickname",
                element:<QuizNicknameEntry />
            },
            {
                path:"waiting",
                element:<PlayerWaitingRoom />
            },
            {
                path:"hostwaiting",
                element:<HostWaitingRoom />
            },
            {
                path:"score",
                element:<ScoreTable />
            },
            {
            
                path:"HostSession",
                element:<HostQuizSession/>
            },
            {
                path:"ParticipantSession",
                element:<ParticipantQuizSession />
            },
            {
                path:"ParticipantWaiting",
                element:<ParticipantWaiting />
            },
            {
                path:"ParticipantScore",
                element:<ParticipantScore />
            },{
                path:"dashboard",
                element:<LoginPage />
            },
            {
                path:"login",
                element:<LoginFormPage/>
            },
            {
                path:"register",
                element:<RegisterPage/>
            },
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}