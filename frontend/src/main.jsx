import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { AppContextProvider } from './contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContextProvider>
            <Toaster />
            <App />
        </AppContextProvider>
    </BrowserRouter>
);