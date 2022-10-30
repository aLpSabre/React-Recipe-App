import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, ImageContainer, Info, InfoDetail, InfoP, Label, Url } from "./Recipes.styled";
export const Recipes = ({ data }) => {
  console.log(data)

const navigate= useNavigate();
  return (

    <>
      {data.map((data, index) => (
        <Container key={index} onClick={() => navigate(`${index}`,{state:{data}})}>
          <ImageContainer>
            <img src={data.recipe.image} alt="food" />
          </ImageContainer>
          <Label>{data.recipe.label}</Label>
          <Info>
            <InfoDetail border>
              <InfoP primary>{Math.trunc(data.recipe.calories/data.recipe.yield)}</InfoP>
              <InfoP >Calories</InfoP>
            </InfoDetail>
            <InfoDetail>
              <InfoP primary>{data.recipe.ingredients.length}</InfoP>
              <InfoP >Ingredients</InfoP>
            </InfoDetail>
          </Info>
          <Url>
            <a href={data.recipe.url} target="_blank">
              {data.recipe.source}
            </a>
          </Url>
        </Container>
      ))}
    </>
  );
};
