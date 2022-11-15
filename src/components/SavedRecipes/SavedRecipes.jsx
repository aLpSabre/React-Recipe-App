import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { RecipeContainer } from "../Form/Form.styled";
import { Recipes } from "../Recipes/Recipes";

export const SavedRecipes = () => {
  const { savedRecipes } = useAuthContext();
  useEffect(() => {
    /*     console.log(savedRecipes);
    savedRecipes.map((element) => console.log(element)); */
  }, []);

  return (
    <>
      <RecipeContainer style={{ width: "100%" }}>
        <Recipes data={savedRecipes}></Recipes>
      </RecipeContainer>
    </>
  );
};
