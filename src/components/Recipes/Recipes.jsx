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
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export const Recipes = ({ data }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const { currentUser } = useAuthContext();
  function handleClick(e) {
    e.stopPropagation();
  }
  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <>
      {data.map((data, index) => (
        <Container
          key={index}
          style={{pointerEvents:loading[index] && "none"}}
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
            <LazyLoad height={300} width={300}>
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
            <LoadingButton
              color="secondary"
              onClick={(e) => {
                handleClick(e);
                setLoading({ ...loading, [index]: true });
                setTimeout(
                  () => setLoading({ ...loading, [index]: false }),
                  1000
                );
               currentUser || navigate("/login"); 
             
              }}
              loading={loading[index]}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{
                backgroundColor: "#11263C",
                "&:hover": { backgroundColor: "#FC6011" },
              }}
            >
              Save
            </LoadingButton>
          </Url>
        </Container>
      ))}
    </>
  );
};
