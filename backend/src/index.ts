import express from 'express';
import 'dotenv/config'; //import the dotenv package to use the .env file
import cors from 'cors'; //security for the server to allow only certain domains to access the server
import * as RecipeAPI from './recipe-api'; //import the recipeAPI file
import { PrismaClient } from '@prisma/client'; //import the prisma client

const app = express();
const prismaClient = new PrismaClient(); //create a new instance of the prisma client
app.use(express.json()); //parse the body of the request to json
app.use(cors()); //use cors

app.get("/api/recipes/search", async (req, res) => {
  // GET http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1
  const result = await RecipeAPI.searchRecipes(req.query.searchTerm as string, parseInt(req.query.page as string)); //We use req.query to get the searchTerm and page from the url
  return res.json(result);
}); //create a route for the server

app.get("/api/recipes/:id/summary", async (req, res) => {
  // GET http://localhost:5000/api/recipes/123/summary
  const result = await RecipeAPI.getRecipeSummary(req.params.id as string); //We use req.params to get the id from the url(req. query deals with data from the end of a URL, while req. params grabs values from dynamic parts of the URL.)
  return res.json(result);
}); //create a route for the server

// This route is responsible for saving a recipe to the database
app.post('/api/recipes/favourite', async (req, res) => {
  // POST http://localhost:5000/api/recipes/favourite
  const recipeId = req.body.recipeId; // We use req.body to get the recipeId from the body of the request
  try {
    const favouriteRecipe = await prismaClient.favouriteRecipes.create({ //create a new favourite recipe in the database
      data: {
        recipeId: recipeId  //set the recipeId to the recipeId from the request
      }
    });
    return res.status(201).json(favouriteRecipe); //return the favourite recipe
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ooops, something went wrong' }); //return an error if the recipe is not saved Don't return sensitive information!
  }
}); //create a route for the server

app.get("/api/recipes/favourite", async (req, res)=>{
  // GET http://localhost:5000/api/recipes/favourite
  try {
    const recipes = await prismaClient.favouriteRecipes.findMany(); // get all the favourite recipes from the database
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString()); //get the recipeIds from the favourite recipes
    const favourites = await RecipeAPI.getFavouriteRecipesByIDs(recipeIds); //get the favourite recipes from the spoonacular API
    return res.json(favourites); //return the favourite recipes
  } catch (error) {
    console.error("Error getting favourite recipes", error);
    return res.status(500).json({error: "Error getting favourite recipes"}); //return an error if the recipes are not found
  }
});

// This route is responsible for deleting a recipe from the database
app.delete('/api/recipes/favourite', async (req, res) => {
  // DELETE http://localhost:5000/api/recipes/favourite
  const recipeId = req.body.recipeId; // We use req.body to get the recipeId from the body of the request
  try {
    await prismaClient.favouriteRecipes.delete({
      where: {
        recipeId: recipeId //delete the favourite recipe from the database
      }
    });
    return res.status(204).json({}); //return an empty response
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Ooops, something went wrong' }); //return an error if the recipe is not deleted
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
}); //start the server on port 5000