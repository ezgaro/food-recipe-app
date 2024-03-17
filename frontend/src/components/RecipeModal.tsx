import { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import { getRecipeSummary } from "../api";

interface Props {
  recipeId: string;
  onClose: () => void;
}

// Recipe Modal Component is a modal that will display the recipe summary when a recipe card is clicked. The modal will be displayed when a recipe card is clicked and will be hidden when the close button is clicked. The modal will display the recipe title and the recipe summary. The recipe title will be the title of the recipe card that was clicked and the recipe summary will be the summary of the recipe that was clicked. The recipe summary will be fetched from the API when the recipe card is clicked. The modal will be hidden when the close button is clicked. The modal will be displayed when a recipe card is clicked and will be hidden when the close button is clicked. The modal will display the recipe title and the recipe summary. The recipe title will be the title of the recipe card that was clicked and the recipe summary will be the summary of the recipe that was clicked. The recipe summary will be fetched from the API when the recipe card is clicked.
export const RecipeModal = ({recipeId, onClose}: Props) => {

  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>(); // We recieve the summary of the recipe from the recipe id

  // We use useEffect to fetch the recipe summary when the component mounts
  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipeSummary();
  }, [recipeId]);

  if(!recipeSummary) {
    return <></>;
  }
  return (
    <>
    <div className="overlay"></div>
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{recipeSummary.title}</h2>
          <span className="close-btn" onClick={onClose}>&times;</span>
        </div>
        <p dangerouslySetInnerHTML={{__html: recipeSummary.summary}}></p> {/* We use dangerouslySetInnerHTML to render the HTML tags */}
      </div>
    </div>
    </>
  )
}