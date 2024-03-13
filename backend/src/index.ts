import express from 'express';
import 'dotenv/config'; //import the dotenv package to use the .env file
import cors from 'cors'; //security for the server to allow only certain domains to access the server
import * as RecipeAPI from './recipe-api'; //import the recipeAPI file

const app = express();
app.use(express.json()); //parse the body of the request to json
app.use(cors()); //use cors

app.get("/api/recipes/search", async (req, res) => {
  // GET http://localhost:5000/api/recipes/search?searchTerm=burgers&page=1
  const result = await RecipeAPI.searchRecipes(req.query.searchTerm as string, parseInt(req.query.page as string));
  return res.json(result);
}); //create a route for the server

app.listen(5000, () => {
  console.log("Server is running on port 5000");
}); //start the server on port 5000