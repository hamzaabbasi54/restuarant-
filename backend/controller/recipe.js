import {RecipeModel} from '../models/recipe.js';

//get all the recipes
export const getRecipes=async(req,res)=>{
    try {
        
        const recipes =  await RecipeModel.find();
        return res.status(200).json(recipes);
    } catch (err) {
        console.error("❌ Error fetching recipes:", err);
        return res.status(500).json({ error: "Failed to fetch recipes" });
    }
};

// get recipe by id
 export const getRecipe=async(req,res)=>{
     try{
       const recipe= await RecipeModel.findById(req.params.id)
       return res.status(200).json(recipe);
     }
     catch(err){
            console.log('error while fetching recipe by id',err);
            res.status(500).json({"error":"Failed to fetch recipe by id"});
     }
 };

//add recipes to db
 export const addRecipe=async(req,res)=>{
        try{
            
        const {title,ingredients,instruction,time,coverImage}=req.body;

        const newRecipe= new RecipeModel({ title,ingredients,instruction,time, coverImage });

        await newRecipe.save();
        res.status(201).json(newRecipe);
        console.log("✅ Recipe created successfully:"); // <-- log success message with recipe details
      }
    catch(err)
    {
        console.error("❌ Error creating recipe:", err); // <-- log actual error
        res.status(500).json({error:"Failed to create recipe"});
    }
 };


 export const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instruction, time, coverImage } = req.body;

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(req.params.id,  { title, ingredients, instruction, time, coverImage }, { new: true } // returns updated document
    );

    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(updatedRecipe);
    console.log("✅ Recipe updated successfully:"); // Log success with details
  }
   catch (err) {
    console.error("❌ Error updating recipe:", err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
};




 export const deleteRecipe=(req,res)=>{
     res.json({"message":"Hello World!"});
 };

