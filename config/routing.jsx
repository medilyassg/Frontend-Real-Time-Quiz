import {createBrowserRouter} from 'react-router-dom'
import App from '../src/App/App'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'
import QuizCodeEntry from '../src/components/ilyass/QuizCodeEntry'
import QuizNicknameEntry from '../src/components/ilyass/QuizNicknameEntry'
import HostWaitingRoom from '../src/components/ilyass/HostWaitingRoom'
import PlayerWaitingRoom from '../src/components/ilyass/PlayerWaitingRoom'
import ScoreTable from '../src/components/ilyass/ScoreTable'

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
                path:"login",
                element:<LoginPage />
            },
            {
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