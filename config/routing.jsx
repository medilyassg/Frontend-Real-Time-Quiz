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
                path:"home",
                element:<div>Home Page</div>
            },
            {
                path:"login",
                element:<LoginPage />
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
            
            
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}