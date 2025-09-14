import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    email:{
    type:String,
    required:true,
    unique:true,
    trim:true
    },
    password:{
        type:String,
        required:true
    }
 },{timestamps:true});

 export const User = mongoose.model('userdata',userschema);





/*
1. A Schema in Mongoose (e.g., userschema) defines the structure of the documents:
   - What fields exist
   - Their data types
   - Validation rules (like required)
    Example: userschema says every User must have title, ingredients, instruction, etc.
2. A Model is created from a Schema using mongoose.model("ModelName", schema).
    - "ModelName" (string) is used by Mongoose internally to name and link the collection.  
    - For example, "userdata" becomes the "userdatas" collection in MongoDB (pluralized automatically).
3. The variable (e.g., const user = ...) is your actual handle in code.
    - Without this, you cannot call functions like user.find(), user.create(), etc.
    - Think of it as: "userdata" is just the official name, user is the tool you actually use.
4. Why do we need both "userdata" and user?
    - "userdata" string = Mongoose's internal registry (shop signboard).
    - user variable = your code’s way to interact with that shop (the door key).
5. Important note:
    - You could later retrieve the same model without redefining schema using mongoose.model("userdata").
    - But best practice is to assign it once and export that variable (user).
Summary:  
- Schema = blueprint of data.
- Model = usable object (class) built from schema.
- Variable (user) = your handle to use that model in queries.
*/
