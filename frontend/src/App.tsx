import { FormEvent, useRef, useState } from "react";
import "./App.css";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import { RecipeModal } from "./components/RecipeModal";

type Tabs = "search" | "favourites"; // We create a type for the tabs

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Good practise to set the type of the state
  const [recipes, setRecipes] = useState<Recipe[]>([]); // We recieve array of recipes frm the serched term
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  ); // We recieve the summary of the recipe from the recipe id
  const [selectedTab, setSelectedTab] = useState<Tabs>("search"); // We use this to keep track of the selected tab [search, favourites]

  const pageNumber = useRef(1); // We use useRef to keep track of the page number without re-rendering the component
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

  return (
    <div>
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}>Recipe Search</h1>{" "}
        {/* We set the selected tab to 'search' */}
        <h1 onClick={() => setSelectedTab("favourites")}>Favourites</h1>{" "}
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
            <button type="submit">Submit</button>
          </form>
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
          <button
            className="view-more-button"
            onClick={() => handleViewMoreClick()}
          >
            View More
          </button>
        </>
      )}
      {selectedTab === "favourites" && (
        <div>
          <h1>Favourites</h1>
          <p>Coming soon...</p>
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
