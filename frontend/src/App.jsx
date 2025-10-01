import React, { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import Home from './pages/Home'
import AddFoodRecipe from './pages/AddFoodRecipe'
import MyRecipes from './pages/MyRecipes'
import EditRecipe from './pages/EditRecipe'
import FavRecipes from './pages/FavRecipes'
import RecipeDetails from './pages/RecipeDetails'

function App() {
  const [recipes, setRecipes] = useState([])
  const [favoriteIds, setFavoriteIds] = useState([])
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('token'))

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
    const savedFavs = JSON.parse(localStorage.getItem('favoriteRecipeIds') || '[]')
    setFavoriteIds(Array.isArray(savedFavs) ? savedFavs : [])
    const updateLogin = () => setIsLogin(!!localStorage.getItem('token'))
    updateLogin()
    window.addEventListener('storage', updateLogin)
    return () => window.removeEventListener('storage', updateLogin)
  }, [])

  const handleRecipeDeleted = (deletedId) => {
    setRecipes(prev => prev.filter(r => (r._id || r.id) !== deletedId))
  }

  const handleRecipeAdded = (newRecipe) => {
    setRecipes(prev => [newRecipe, ...prev])
  }

  const handleToggleFavorite = (id) => {
    setFavoriteIds(prev => {
      const recipeId = id
      const next = prev.includes(recipeId) ? prev.filter(x => x !== recipeId) : [recipeId, ...prev]
      localStorage.setItem('favoriteRecipeIds', JSON.stringify(next))
      return next
    })
  }

  return (
    <Routes>                                                                                                                                                                                                                                                                                                      
      <Route path="/" element={<MainNavigation />}>
        <Route index element={<Home recipes={recipes} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} isLogin={isLogin} />} />
        <Route path='/myrecipe' element={<MyRecipes recipes={recipes} onRecipeDeleted={handleRecipeDeleted} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} isLogin={isLogin} />}/>
        <Route path='/favrecipe' element={<FavRecipes recipes={recipes} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} />}/>
        <Route path='/addrecipe' element={<AddFoodRecipe onRecipeAdded={handleRecipeAdded}/>}/>
        <Route path='/edit/:id' element={<EditRecipe/>}/>
        <Route path='/recipe/:id' element={<RecipeDetails/>}/>
      </Route>
    </Routes>
  )
}

export default App