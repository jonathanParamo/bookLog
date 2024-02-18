import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)