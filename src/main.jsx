import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  FirebaseProvider } from './context/firebase';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-4f6uxm536dy7amlo.us.auth0.com"
    clientId="rlAY2FFFix4leSCFGa5MPVkcSita3XQI"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
    <FirebaseProvider>

    <App />
    </FirebaseProvider>
    </BrowserRouter>
 </Auth0Provider>,
)
