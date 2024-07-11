// import electronLogo from './assets/electron.svg'
/* <img alt="logo" className="logo" src={electronLogo} /> */

import './globals.css'

import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
