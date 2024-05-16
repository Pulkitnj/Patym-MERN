import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/signup" element={ <SignUp /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
