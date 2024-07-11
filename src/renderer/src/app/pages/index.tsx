import { Route, Routes } from 'react-router-dom'

import AuthProvider from '../../providers/AuthProvider'
import LanguageProvider from '../..//providers/LanguageProvider'

/* import Admin from './admin'
import Company from './company' 
import Client from './client'*/

import Login from './public/login/Login'
import Register from './public/register'
import Home from './home'
/* import ResetPassword from './public/ResetPassword' */
/* import ForgotPassword from './public/ForgotPassword' */

const Pages = (): JSX.Element => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/*      <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} /> */}
          <Route path="/register/:id/:token" element={<Register />} />
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
