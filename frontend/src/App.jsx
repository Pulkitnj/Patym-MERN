import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signup } from './pages/SignUp'
import { SendMoney } from './components/SendMoney'
import Dashboard from './pages/Dashboard'
import Signin from './pages/SignIn'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/signin" element={ <Signin /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />
        <Route path="/send" element={ <SendMoney /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
