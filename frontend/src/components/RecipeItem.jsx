import React from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6";
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

export default function RecipeItem({recipes, onDeleted, showActions, favoriteIds = [], onToggleFavorite, isLogin}) {
    const navigate = useNavigate();
    console.log("Recipes in RecipeItem:", recipes)
    return (
        <div className='card-container'>
            {(!recipes || recipes.length === 0) ? (
                <div>No recipes found.</div>
            ) : (
                recipes.map((recipe, index) => {
                    // Construct image URL if coverImage exists
                    const imageUrl = recipe.coverImage
                        ? `http://localhost:3000/images/${recipe.coverImage}`
                        : foodRecipe;
                    const recipeId = recipe._id || recipe.id
                    const handleEdit = (e) => {
                        e.stopPropagation()
                        if (recipeId) navigate(`/edit/${recipeId}`)
                    }
                    const handleDelete = async (e) => {
                        e.stopPropagation()
                        if (!recipeId) return
                        try {
                            await fetch(`http://localhost:3000/recipe/${recipeId}`, { method: 'DELETE' })
                            if (typeof onDeleted === 'function') onDeleted(recipeId)
                        } catch (err) {
                            console.error('Failed to delete recipe', err)
                        }
                    }
                    const isFavorite = favoriteIds.includes(recipeId)
                    const handleToggleFavorite = (e) => {
                        e.stopPropagation()
                        if (typeof onToggleFavorite === 'function' && recipeId) {
                            onToggleFavorite(recipeId)
                        }
                    }
                    return (
                        <div key={index} className='card' onClick={() => navigate(`/recipe/${recipeId}`)} style={{cursor: 'pointer'}}>
                            <img src={imageUrl} width='120px' height='100px' alt={recipe.title} />
                            <div className='card-body'>
                                <div className='card-title'>{recipe.title}</div>
                                <div className='icons'>
                                    <div className='timer'>
                                        <BsFillStopwatchFill />
                                        <span>{recipe.time} mins</span>
                                    </div>
                                    {isLogin && (
                                      <FaHeart className={`heartIcon ${isFavorite ? 'heartActive' : ''}`} onClick={handleToggleFavorite} />
                                    )}
                                    {showActions && (
                                        <div className='action'>
                                            <FiEdit2 className='editIcon' onClick={handleEdit} />
                                            <FiTrash2 className='deleteIcon' onClick={handleDelete} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}