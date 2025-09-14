import React, { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import Home from './pages/Home'

function App() {
  const [recipes, setRecipes] = useState([])

  const getallrecipes = async () => {
    try {
      const res = await axios.get('http://localhost:3000/recipe')  // Changed port to 3000
      console.log('API Response in app.jsx:', res.data) // Add logging to debug
      setRecipes(res.data)
    } catch (error) {
      console.error("Error fetching recipes:", error.message)
    }
  }

  useEffect(() => {
    getallrecipes()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<MainNavigation />}>
        <Route index element={<Home recipes={recipes} />} />
        <Route path='/myrecipe' element={<Home/>}/>
        <Route path='/favrecipe' element={<Home/>}/>
      </Route>
    </Routes>
  )
}

export default App