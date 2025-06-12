import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MsalProvider } from '@azure/msal-react'
import { msalInstance } from './config/authConfig.jsx'
import { Provider } from 'react-redux'
import store  from './Components/redux/store/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
      <App />
      </Provider>
    </MsalProvider>
  </StrictMode>,
)


