import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/index.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
    <App />
    </Provider>
    </Router>
  </StrictMode>,
)


