import React from 'react'
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

import Home from './pages/Home'
import Appointment from './pages/Appointment'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  )
}
