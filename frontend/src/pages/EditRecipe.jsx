import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({ title: '', time: '', ingredients: [], instruction: '', coverImage: '' })
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const loadRecipe = async () => {
            const res = await axios.get(`http://localhost:3000/recipe/${id}`)
            const data = res.data || {}
            setRecipeData({
                title: data.title || '',
                time: data.time || '',
                ingredients: Array.isArray(data.ingredients) ? data.ingredients : (data.ingredients ? [data.ingredients] : []),
                instruction: data.instruction || '',
                coverImage: data.coverImage || ''
            })
        }
        loadRecipe()
    }, [id])

    const onHandleChange = (e) => {
        const val = (e.target.name === 'ingredients')
            ? e.target.value.split(',')
            : e.target.value
        setRecipeData(prev => ({ ...prev, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:3000/recipe/${id}`, recipeData)
        navigate('/myrecipe')
    }

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" value={recipeData.title} onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" value={recipeData.time} onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea className='input-textarea' name="ingredients" rows="5" value={recipeData.ingredients.join(',')} onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea className='input-textarea' name="instruction" rows="5" value={recipeData.instruction} onChange={onHandleChange}></textarea>
                    </div>
                    <button type="submit">Update Recipe</button>
                </form>
            </div>
        </>
    )
}


