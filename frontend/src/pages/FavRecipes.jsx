import React, { useMemo } from 'react'
import RecipeItem from '../components/RecipeItem'

export default function FavRecipes({ recipes, favoriteIds, onToggleFavorite }) {
  const favRecipes = useMemo(() => {
    const ids = new Set(favoriteIds || [])
    return (recipes || []).filter(r => ids.has(r._id || r.id))
  }, [recipes, favoriteIds])

  return (
    <div className='recipe'>
      <RecipeItem recipes={favRecipes} onToggleFavorite={onToggleFavorite} favoriteIds={favoriteIds} />
    </div>
  )
}


