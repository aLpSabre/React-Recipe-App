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
import GridLoader from "react-spinners/GridLoader";
export const Recipes = ({ data }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const [saved, setSaved] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const { currentUser } = useAuthContext();
  function handleClick(e) {
    e.stopPropagation();
  }
  useEffect(() => {
 
    console.log(data);
    data.length > 0 && setTimeout(() => setDataLoading(false), 1000);
  }, [data]);

  return (
    <>
      {dataLoading ? (
        <GridLoader color="#FC6011" size={30} speedMultiplier={1} />
      ) : (
        data.map((data, index) => (
          <Container
            key={index}
            style={{ pointerEvents: loading[index] && "none" }}
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
                  setSaved({ ...saved, [index]: !saved[index] });
                  currentUser || navigate("/login");
                }}
                loading={loading[index]}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{
                  backgroundColor: `${saved[index] ? "#FC6011" : "#11263C"}`,
                  "&:hover": { backgroundColor: "#FC6011" },
                }}
              >
                {saved[index] ? "Unsave" : "Save"}
              </LoadingButton>
            </Url>
          </Container>
        ))
      )}
    </>
  );
};
