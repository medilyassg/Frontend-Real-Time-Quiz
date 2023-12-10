import {createBrowserRouter, Outlet} from 'react-router-dom'
import App from '../src/App/App'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'
import HostQuizSession from '../src/components/HostSession/HostQuizSession'
import ParticipantQuizSession from '../src/components/ParticipantSession/ParticipantQuizSession'
import ParticipantWaiting from '../src/components/ParticipantSession/ParticipantWaiting'
import ParticipantScore from '../src/components/ParticipantSession/ParticipantScore'

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
            },
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}