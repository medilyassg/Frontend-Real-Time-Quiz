import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginPage from './components/LoginPage.jsx'
import { Provider } from 'react-redux';
import store from './store/Store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <LoginPage />
    </Provider>
)
