import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './contexts/AppContext.jsx'
import { MoodProvider } from './contexts/MoodContext.jsx'
import { TimerProvider } from './contexts/TimerContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <MoodProvider>
        <TimerProvider>
          <AppProvider>
            <App />
          </AppProvider>
        </TimerProvider>
      </MoodProvider>
    </UserProvider>
  </StrictMode>,
)
