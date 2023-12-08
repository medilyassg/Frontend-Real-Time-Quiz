import {createBrowserRouter, Outlet} from 'react-router-dom'
import App from '../src/App/App'
import HomePage from '../src/components/HomePage'
import LoginPage from '../src/components/LoginPage'
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
                path:"dashbord",
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