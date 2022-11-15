import { useAuthContext } from "../../context/AuthContext";
import { RecipeContainer } from "../Form/Form.styled";
import { Recipes } from "../Recipes/Recipes";

export const SavedRecipes = () => {
  const { savedRecipes } = useAuthContext();

  return (
    <>
      <RecipeContainer style={{ width: "100%" }}>
        <Recipes data={savedRecipes} savedSection={"savedSection"}></Recipes>
      </RecipeContainer>
    </>
  );
};
