import {createBrowserRouter, Outlet} from 'react-router-dom'
import App from '../src/App/App'
import CreateQuizPage from '../src/components/CreateQuizPage'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'

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
            },
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}