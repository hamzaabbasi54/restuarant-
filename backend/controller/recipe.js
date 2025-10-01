import {RecipeModel} from '../models/recipe.js';
import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname
        cb(null, filename)
    }
})

export const upload = multer({ storage: storage })

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
            
        const {title,ingredients,instruction,time} = req.body;
        const coverImage = req.file ? req.file.filename : null;

        const newRecipe= new RecipeModel({ title,ingredients,instruction,time, coverImage });

        await newRecipe.save();
        res.status(201).json(newRecipe);
        console.log("✅ Recipe created successfully:", newRecipe);
      }
    catch(err)
    {
        console.error("❌ Error creating recipe:", err);
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
    RecipeModel.findByIdAndDelete(req.params.id)
        .then((doc)=>{
            if(!doc){
                return res.status(404).json({error:"Recipe not found"});
            }
            return res.status(200).json({message:"Recipe deleted"});
        })
        .catch((err)=>{
            console.error("❌ Error deleting recipe:", err);
            return res.status(500).json({error:"Failed to delete recipe"});
        })
 };
