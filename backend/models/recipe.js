import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  ingredients: { 
    type: Array,  // Change to array of strings
    required: true 
  },
  instruction: { 
    type: String, 
    required: true 
  },
  time: { 
    type: Number,    // Change to number for better querying
    required: true   // Should probably be required
  },
  coverImage: { 
    type: String,
    default: null
  }  
    },{timestamps:true});

export  const RecipeModel = mongoose.model("Recipe", recipeSchema);

/*
1. A Schema in Mongoose (e.g., recipeSchema) defines the structure of the documents:
   - What fields exist
   - Their data types
   - Validation rules (like required)

   Example: recipeSchema says every Recipe must have title, ingredients, instruction, etc.

2. A Model is created from a Schema using mongoose.model("ModelName", schema).
   - "ModelName" (string) is used by Mongoose internally to name and link the collection.
   - For example, "Recipe" becomes the "recipes" collection in MongoDB (pluralized automatically).

3. The variable (e.g., const RecipeModel = ...) is your actual handle in code.
   - Without this, you cannot call functions like RecipeModel.find(), RecipeModel.create(), etc.
   - Think of it as: "Recipe" is just the official name, RecipeModel is the tool you actually use.

4. Why do we need both "Recipe" and RecipeModel?
   - "Recipe" string = Mongoose's internal registry (shop signboard).
   - RecipeModel variable = your code’s way to interact with that shop (the door key).

5. Important note:
   - You could later retrieve the same model without redefining schema using mongoose.model("Recipe").
   - But best practice is to assign it once and export that variable (RecipeModel).

Summary:
- Schema = blueprint of data.
- Model = usable object (class) built from schema.
- Variable (RecipeModel) = your handle to use that model in queries.
*/
