import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/Store'
import {RouterProvider} from 'react-router-dom'
import {routes} from '../config/routing'
import App from './App/App';
ReactDOM.createRoot(document.getElementById('root')).render(
    
        <Provider store={store}>
            <RouterProvider router={routes}>
                <App />
            </RouterProvider>
        </Provider>
)
