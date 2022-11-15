import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { RecipeContainer } from "../Form/Form.styled";
import { Recipes } from "../Recipes/Recipes";
import GridLoader from "react-spinners/GridLoader";
import { useState } from "react";

export const SavedRecipes = () => {
  const { savedRecipes } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuthContext();

  useEffect(() => {

    currentUser&& setLoading(false);
  }, [currentUser,loading]);

  return (
    <>
      {loading ? (
        <GridLoader color="#FC6011" size={30} speedMultiplier={1} />
      ) : (
        <RecipeContainer style={{ width: "100%" }}>
          <Recipes data={savedRecipes} savedSection={"savedSection"}></Recipes>
        </RecipeContainer>
      )}
    </>
  );
};
