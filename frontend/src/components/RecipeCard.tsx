import { Recipe } from "../types";
import { AiOutlineHeart } from "react-icons/ai"; // We import the heart icon from react-icons/ai
import { AiFillHeart } from "react-icons/ai"; // We import the filled heart icon from react-icons/ai

interface Props {
  recipe: Recipe;
  isFavourite: boolean; // We add a new prop to the RecipeCard component
  onClick: () => void; // We pass a function to the onClick prop that will be called when the recipe card is clicked
  onFavoriteClick: (recipe: Recipe) => void; // We pass a function to the onFavoriteClick prop that will be called when the favourite button is clicked
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavoriteClick,
  isFavourite,
}: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      {/* We call the onClick function when the recipe card is clicked */}
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-card-title">
        <span
          onClick={(e) => {
            e.stopPropagation(); // We stop the event from propagating to the recipe card
            onFavoriteClick(recipe); // We call the onFavoriteClick function when the favourite button is clicked
          }}
        >
          {isFavourite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}{" "}
          {/* We add the heart icon */}
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
