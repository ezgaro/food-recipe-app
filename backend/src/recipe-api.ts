// This file is responsible for fetching the data from the spoonacular API
const apiKey = process.env.API_KEY;
// This function is responsible for fetching the recipes from the spoonacular API
const searchRecipes = async (searchTerm: string, page: number) => {
  if(!apiKey) {
    throw new Error('API key not find');
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");//base url
  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: "10",
    offset: ((page - 1) * 10).toString() // Adding from which page we are fetching the data(they are starting from 0)
  }
  //URLSearchParams is taking an object an presenting it as a query string(apiKey=123&query=burger&number=10&offset=0)
  url.search = new URLSearchParams(queryParams).toString();


  try {
    const searchResponce = await fetch(url.toString());
    const resultJSON = await searchResponce.json();
    return resultJSON;
  } catch (error) {
    console.error('Error searching for recipes', error);
    throw error;
  }
};
// This function is responsible for fetching the recipe summary from the spoonacular API
const getRecipeSummary = async (recipeId: string) => {
  // This function is responsible for fetching the recipe summary from the spoonacular API
  if(!apiKey) {
    throw new Error('API key not find');
  }

  const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/summary`);
  url.search = new URLSearchParams({ apiKey: apiKey }).toString();

  try {
    const response = await fetch(url.toString());
    const resultJSON = await response.json();
    return resultJSON;
  } catch (error) {
    console.error('Error getting recipe summary', error);
    throw error;
  }
};

// Function to get favourite recipes from the database
// https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
const getFavouriteRecipesByIDs = async (ids: string[]) => {
  if(!apiKey) {
    throw new Error('API key not found');
  }

  const url = new URL("https://api.spoonacular.com/recipes/informationBulk");

  const params = {
    apiKey,
    ids: ids.join(","),
  };

  url.search = new URLSearchParams(params).toString();

  const searchResponse = await fetch(url);
  const json = await searchResponse.json();

  return {result: json};
}

export { searchRecipes, getRecipeSummary, getFavouriteRecipesByIDs};