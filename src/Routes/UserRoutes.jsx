import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Common/Register'
import Home from '../pages/Common/Home'

function UserRoutes() {
  return (
    <Routes>
        <Route path="/"
        element={
            <Home/>
        }
        />
        <Route path="/register"
        element={
            <Register/>
        }
        />
      
    </Routes>
  )
}

export default UserRoutes
