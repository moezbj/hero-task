import { Route, Routes, useLocation } from 'react-router-dom'

import AuthProvider from '../../providers/AuthProvider'
import LanguageProvider from '../..//providers/LanguageProvider'

/* import Admin from './admin'
import Company from './company' 
import Client from './client'*/

import Login from './public/login/Login'
import Register from './public/register'
import Home from './home'
import ResetPassword from './public/resetPassword'
import ForgotPassword from './public/forgotPassword'
// import { useNavigate } from 'react-router-dom'
const { ipcRenderer } = require('electron')

const Pages = (): JSX.Element => {
  const location = useLocation()
  console.log('useLocation', location)
  //const navigate = useNavigate()

  ipcRenderer.on('navigate', (event, url) => {
    window.location.href = url
  })
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/admin/*" element={<Admin />} />
          <Route path="/company/*" element={<Company />} /> */}
          {/* <Route path="/client/*" element={<Client />} /> */}
          <Route element={<div>404 not found</div>} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default Pages
