import { FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import { RecipeModal } from "./components/RecipeModal";
import { AiOutlineSearch } from "/home/stefan/Documents/recipe-app/food-recipe-app/backend/node_modules/react-icons/ai";

type Tabs = "search" | "favourites"; // We create a type for the tabs

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Good practise to set the type of the state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // We recieve array of recipes frm the serched term
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  ); // We recieve the summary of the recipe from the recipe id
  const [selectedTab, setSelectedTab] = useState<Tabs>("search"); // We use this to keep track of the selected tab [search, favourites]
  const [favouriteRecipes, setFavouriteRecipes] = useState<Recipe[]>([]); // We use this to keep track of the favourite recipes

  const pageNumber = useRef(1); // We use useRef to keep track of the page number without re-rendering the component

  // We use useEffect to fetch the favourite recipes when the component loads for the first time
  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      try {
        const favouriteRecipes = await api.getFavouriteRecipes(); // We get the favourite recipes
        setFavouriteRecipes(favouriteRecipes.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavouriteRecipes();
  }, []);
  const handleSearchSubmit = async (e: FormEvent) => {
    // We handle the search submit
    e.preventDefault(); // We prevent the default behaviour of the form
    try {
      const recipes = await api.searchRecipes(searchTerm, 1); // We search the recipes
      setRecipes(recipes.results); // We set the recipes with '.results', because the response is an object with a 'results' key
      pageNumber.current = 1; // We reset the page number, so that when we search for a new term, we start from page 1
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewMoreClick = async () => {
    const nextPageNumber = pageNumber.current + 1; // We increment the page number
    try {
      const nextRecipes = await api.searchRecipes(searchTerm, nextPageNumber); // We search the recipes
      setRecipes([...recipes, ...nextRecipes.results]); // We spread the previous recipes and add the new ones
      pageNumber.current = nextPageNumber; // We update the page number
    } catch (error) {
      console.error(error);
    }
  };

  const addFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.addFavouriteRecipe(recipe);
      setFavouriteRecipes([...favouriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteRecipe = async (recipe: Recipe) => {
    try {
      await api.removeFavouriteRecipe(recipe);
      const updatedRecipes = favouriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavouriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/pexels-malidate-van-769289.jpg" alt="Header Image" />
        <div className="title">Recipe App</div>
      </div>
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        {/* We set the selected tab to 'search' */}
        <h1
          className={selectedTab === "favourites" ? "tab-active" : ""}
          onClick={() => setSelectedTab("favourites")}
        >
          Favourites
        </h1>
        {/* We set the selected tab to 'favourites' */}
      </div>
      {/* We only show the search tab if the selected tab is 'search' */}
      {selectedTab === "search" && (
        <>
          <form onSubmit={(e) => handleSearchSubmit(e)}>
            {/* Every time we submit the form we call the handleSearchSubmit function */}
            <input
              type="text"
              required
              placeholder="Enter a search term..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/*Making the form input dynamic*/}
            <button type="submit">
              <AiOutlineSearch size={25}></AiOutlineSearch>
            </button>
          </form>

          <div className="recipe-grid">
            {recipes.map((recipe) => {
              const isFavourite = favouriteRecipes.some(
                (favourite) => favourite.id === recipe.id
              ); // We check if the recipe is in the favourites
              return (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavoriteClick={
                    isFavourite ? removeFavouriteRecipe : addFavouriteRecipe
                  } // We call removeFavouriteRecipe if the recipe is in the favourites, otherwise we call addFavouriteRecipe
                  isFavourite={isFavourite} // We pass the isFavourite prop to the RecipeCard component
                />
              );
            })}
          </div>

          <button className="view-more" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}
      {selectedTab === "favourites" && (
        <div className="recipe-grid">
          {favouriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)} // setSelectedRecipe is called when we click the recipe card
              onFavoriteClick={removeFavouriteRecipe} // removeFavouriteRecipe is called when we click the favourite button
              isFavourite={true} // We set isFavourite to true, because we are in the favourites tabs
            />
          ))}
        </div>
      )}
      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};
export default App;
