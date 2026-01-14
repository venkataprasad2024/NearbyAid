import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'leaflet/dist/leaflet.css'  // keep this

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>   ← REMOVE or COMMENT THIS LINE
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
)