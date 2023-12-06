import {createBrowserRouter} from 'react-router-dom'
import App from '../src/App/App'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'
import QuizCodeEntry from '../src/components/QuizCodeEntry'
import QuizNicknameEntry from '../src/components/QuizNicknameEntry'
import HostWaitingRoom from '../src/components/HostWaitingRoom'
import PlayerWaitingRoom from '../src/components/PlayerWaitingRoom'

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
            
            
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}