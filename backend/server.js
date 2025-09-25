import dotenv from "dotenv";
dotenv.config();
import express from "express";
import RecipeRouter from './routes/recipe.js';
import {connectDb} from "./config/connectionDb.js";
import cors from 'cors';
import UserRouter from './routes/user.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const port=process.env.PORT || 5000

 connectDb();
app.use('/',UserRouter);
app.use('/recipe',RecipeRouter);


app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})
