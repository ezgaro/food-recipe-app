import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  onClick: () => void; // We pass a function to the onClick prop that will be called when the recipe card is clicked
}

const RecipeCard = ({recipe, onClick}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}> {/* We call the onClick function when the recipe card is clicked */}
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
      <h3>{recipe.title}</h3>
      </div>
    </div>
  )
}

export default RecipeCard;