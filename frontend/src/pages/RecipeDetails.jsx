import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/recipe/${id}`)
        setRecipe(res.data)
      } catch (e) {
        setError('Failed to load recipe')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <div className='outer-container'>Loading...</div>
  if (error) return <div className='outer-container'>{error}</div>
  if (!recipe) return null

  const imageUrl = recipe.coverImage ? `http://localhost:3000/images/${recipe.coverImage}` : ''

  return (
    <div className='outer-container'>
      <h2 className='title'>{recipe.title}</h2>
      <div className='recipe-details'>
        {imageUrl && (
          <img src={imageUrl} alt={recipe.title} width='320' height='240' style={{objectFit:'cover', borderRadius: '8px'}} />
        )}
        <div>
          <p><strong>Time:</strong> {recipe.time} mins</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {(Array.isArray(recipe.ingredients) ? recipe.ingredients : []).map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
          <p style={{marginTop:'1rem'}}><strong>Instructions:</strong></p>
          <p>{recipe.instruction}</p>
        </div>
      </div>
    </div>
  )
}


