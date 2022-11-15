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
import { getDataFire, setDataFire } from "../../firestore/firestore";
export const Recipes = ({ data, savedSection }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});
  const [saved, setSaved] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const { currentUser, savedRecipes, setSavedRecipes } = useAuthContext();
  function handleClick(e) {
    e.stopPropagation();
  }

  const handleSaved = (index, data) => {
    if (typeof saved[index] === "undefined") {
      setSavedRecipes([...savedRecipes, data]);
    } else if (!saved[index]) {
      setSavedRecipes([...savedRecipes, data]);
    } else {
      setSavedRecipes(
        savedRecipes.filter((element) => element.recipe.url !== data.recipe.url)
      );
    }
  };

  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000);
  }, [data]);
  useEffect(() => {
    currentUser && getDataFire(currentUser.uid, "saved", setSaved);
  }, [currentUser]);

  useEffect(() => {
    Object.keys(saved).length !== 0 &&
      setDataFire(currentUser.uid, "saved", { saved: saved });
  }, [saved]);

  return (
    <>
      {dataLoading ? (
        <GridLoader color="#FC6011" size={30} speedMultiplier={1} />
      ) : data.length ? (
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
                  setLoading({
                    ...loading,
                    [data.recipe.uri.slice(
                      data.recipe.uri.indexOf("#") + 1,
                      data.recipe.uri.length
                    )]: true,
                  });

                  setLoading({
                    ...loading,
                    [data.recipe.uri.slice(
                      data.recipe.uri.indexOf("#") + 1,
                      data.recipe.uri.length
                    )]: false,
                  });
                  setSaved({
                    ...saved,
                    [data.recipe.uri.slice(
                      data.recipe.uri.indexOf("#") + 1,
                      data.recipe.uri.length
                    )]:
                      !saved[
                        data.recipe.uri.slice(
                          data.recipe.uri.indexOf("#") + 1,
                          data.recipe.uri.length
                        )
                      ],
                  });
                  currentUser || navigate("/login");

                  handleSaved(
                    data.recipe.uri.slice(
                      data.recipe.uri.indexOf("#") + 1,
                      data.recipe.uri.length
                    ),
                    data
                  );
                }}
                loading={
                  loading[
                    data.recipe.uri.slice(
                      data.recipe.uri.indexOf("#") + 1,
                      data.recipe.uri.length
                    )
                  ]
                }
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                sx={{
                  backgroundColor: `${
                    saved[
                      data.recipe.uri.slice(
                        data.recipe.uri.indexOf("#") + 1,
                        data.recipe.uri.length
                      )
                    ]
                      ? "#FC6011"
                      : "#11263C"
                  }`,
                  "&:hover": { backgroundColor: "#FC6011" },
                }}
              >
                {saved[
                  data.recipe.uri.slice(
                    data.recipe.uri.indexOf("#") + 1,
                    data.recipe.uri.length
                  )
                ]
                  ? "Unsave"
                  : "Save"}
              </LoadingButton>
            </Url>
          </Container>
        ))
      ) : savedSection ? (
        <h2>No Saved Recipes Found!</h2>
      ) : (
        <GridLoader color="#FC6011" size={30} speedMultiplier={1} />
      )}
    </>
  );
};
