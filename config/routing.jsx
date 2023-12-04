import {createBrowserRouter, Outlet} from 'react-router-dom'
import App from '../src/App/App'
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
                path:"login",
                element:<LoginPage />
            },
        ],
        errorElement : <div>Error Page</div>

    }
])

export {routes}