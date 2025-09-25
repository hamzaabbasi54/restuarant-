import React from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6";

export default function RecipeItem({recipes}) {
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
                    return (
                        <div key={index} className='card'>
                            <img src={imageUrl} width='120px' height='100px' alt={recipe.title} />
                            <div className='card-body'>
                                <div className='card-title'>{recipe.title}</div>
                                <div className='icons'>
                                    <div className='timer'>
                                        <BsFillStopwatchFill />
                                        <span>{recipe.time} mins</span>
                                    </div>
                                    <FaHeart />
                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    )
}