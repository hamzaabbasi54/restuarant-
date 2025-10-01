import React, { useEffect, useState } from 'react'
import RecipeItem from '../components/RecipeItem'

function MyRecipes({recipes, onRecipeDeleted, favoriteIds, onToggleFavorite, isLogin}) {
  const [localRecipes, setLocalRecipes] = useState(recipes || [])

  useEffect(() => {
    setLocalRecipes(recipes || [])
  }, [recipes])

  const handleDeleted = (deletedId) => {
    setLocalRecipes(prev => prev.filter(r => (r._id || r.id) !== deletedId))
    if (typeof onRecipeDeleted === 'function') onRecipeDeleted(deletedId)
  }

  return (
    <div className='recipe'>
      <RecipeItem recipes={localRecipes} onDeleted={handleDeleted} showActions={isLogin} favoriteIds={favoriteIds} onToggleFavorite={onToggleFavorite} isLogin={isLogin} />
    </div>
  )
}

export default MyRecipes


