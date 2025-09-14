import React from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import { BsFillStopwatchFill } from "react-icons/bs"
import { FaHeart } from "react-icons/fa6";

export default function RecipeItem({recipes}) {
    console.log("Recipes in RecipeItem:", recipes)
    return (
        <div className='card-container'>
            {recipes && recipes.map((recipe, index) => (
                <div key={index} className='card'>
                    <img src={foodRecipe} width='120px' height='100px' alt={recipe.title} />
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
            ))}
        </div>
    )
}