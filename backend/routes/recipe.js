import {Router} from 'express';
import {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe}
    from '../controller/recipe.js';

const router=Router();

router.get('/',getRecipes);//get all the recipe

router.get('/:id',getRecipe);//get recipe by id

router.post('/',addRecipe);//add recipe

router.put('/:id',editRecipe);//edit recipe

router.delete('/:id',deleteRecipe);//edit recipe

export default router; 