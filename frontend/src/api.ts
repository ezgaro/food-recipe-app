import { Recipe } from "./types";
// This file contains the API functions that will be used to fetch the recipes from the backend server. We have the following functions:


export const searchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const getFavouriteRecipes = async () => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

// This function is used to add a recipe to the favourites
export const addFavouriteRecipe = async (recipe: Recipe) => {
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

export const removeFavouriteRecipe = async (recipe: Recipe) => {
  // We DELETE the recipe from the favourites
  const url = new URL("http://localhost:5000/api/recipes/favourite");
  const body = {
    recipeId: recipe.id,
  };

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};



