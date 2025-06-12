import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-26caq3b55jx5o1cq.us.auth0.com"
    clientId="rBIytOK7S5qaULGAJ8d7rkQ6a82bj3hx"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-26caq3b55jx5o1cq.us.auth0.com/api/v2/",
      scope: "openid profile email"
    }}>
    <App />
  </Auth0Provider>
  ,
)
