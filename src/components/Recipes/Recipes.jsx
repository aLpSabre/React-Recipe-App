import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ImageContainer,
  Info,
  InfoDetail,
  InfoP,
  Label,
  Url,
} from "./Recipes.styled";
import LazyLoad from "react-lazy-load";
export const Recipes = ({ data }) => {
  const navigate = useNavigate();

  return (
    <>
      {data.map((data, index) => (
        <Container
          key={index}
          onClick={() =>
            navigate(
              `${data.recipe.uri.slice(
                data.recipe.uri.indexOf("#") + 1,
                data.recipe.uri.length
              )}`
            )
          }
        >
          <ImageContainer>
            <LazyLoad  height={300} width={300} threshold={0.95}>
              <img src={data.recipe.image} alt="food" />
            </LazyLoad>
          </ImageContainer>
          <Label>{data.recipe.label}</Label>
          <Info>
            <InfoDetail border>
              <InfoP primary>
                {Math.trunc(data.recipe.calories / data.recipe.yield)}
              </InfoP>
              <InfoP>Calories</InfoP>
            </InfoDetail>
            <InfoDetail>
              <InfoP primary>{data.recipe.ingredients.length}</InfoP>
              <InfoP>Ingredients</InfoP>
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
