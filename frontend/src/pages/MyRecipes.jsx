import React from 'react'
import RecipeItem from '../components/RecipeItem'

function MyRecipes({recipes}) {
  return (
    <div className='recipe'>
      <RecipeItem recipes={recipes} />
    </div>
  )
}

export default MyRecipes


