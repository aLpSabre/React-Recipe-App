import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LazyLoad from "react-lazy-load";
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  min-height: 80vh;
  flex-direction: column;
  margin: auto;
  gap: 1rem;
  color: #11263c;
  padding: 2rem 0;
  cursor: pointer;

  span span:nth-child(odd) {
    background-color: #11263c !important;
  }

  h1,
  h2 {
    color: #fc6011;
    :hover {
      color: #11263c;
    }
  }
  @media (max-width: 1200px) {
    width: 80%;
    h1 {
      font-size: 1.5rem;
    }
    h1,
    h2 {
      text-align: center;
    }
  }
  @media (max-width: 880px) {
    width: 90%;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: auto;
  @media (max-width: 880px) {
    flex-direction: column;
  }
`;
const ImageContainer = styled.div`
  width: 400px;

  img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  @media (max-width: 1200px) {
    width: 350px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  gap: 1.4rem;
  background-color: #f0f5f9;
  border-radius: 10px;
  padding: 2rem;
  margin: auto;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media (max-width: 880px) {
    width: 95%;
  }
`;
const InfoDetail = styled.div`
  text-align: center;
  color: #fc6011;
  text-transform: capitalize;
`;
const InfoTitle = styled.p`
  margin-bottom: 0.4rem;
  color: #11263c;
  font-weight: bold;
`;
const SpanContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
  cursor: pointer;
  span {
    text-transform: capitalize;
    background-color: #f0f5f9;
    width: 150px;
    font-weight: bold;
    padding: 1rem;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    :hover {
      color: #fc6011;
    }
  }
`;
const Spans = styled.span`
  text-transform: capitalize;
  background-color: #f0f5f9;
  width: 150px;
  font-weight: bold;
  padding: 1rem;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  :hover {
    color: #fc6011;
  }
`;

const Ingr = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 1.5rem;

  h2 {
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 1rem;
    :hover {
      color: #fc6011;
    }
  }
  a {
    text-decoration: none;
    color: #11263c;
    margin-left: 0.2rem;
    :hover {
      color: #fc6011;
    }
  }
  div {
    flex-basis: 45%;
    width: 95%;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      text-align: center;
    }
  }
`;
const Button = styled.button`
  width: 150px;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  background-color: #11263c;

  a {
    text-decoration: none;
    color: white;
  }
`;

export const RecipeDetail = () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const get = async () => {
    const response = await axios(
      `https://api.edamam.com/search?app_id=61112930&app_key=617e15bff01b2760c29ccc82729d0e21&r=http://www.edamam.com/ontologies/edamam.owl%23${id}`
    );
    console.log();
    setTimeout(() => setLoading(false), 1000);
    setRecipe(response.data[0]);
  };
  useEffect(() => {
    get();
  }, []);

  return (
    <>
      {loading ? (
        <Container>
          <GridLoader color={"#FC6011"} size={30} />
        </Container>
      ) : (
        <Container>
          <h1>{recipe?.label}</h1>
          <Header>
            <div>
              <ImageContainer>
                <LazyLoad height={350} width={350} threshold={0.95}>
                  <img src={recipe?.image} alt="food" />
                </LazyLoad>
              </ImageContainer>
            </div>
            <div>
              {" "}
              <InfoContainer>
                <InfoDetail>
                  <InfoTitle>Total Time:</InfoTitle>
                  <p>{recipe?.totalTime ? recipe?.totalTime : "Not given"}</p>
                </InfoDetail>
                <InfoDetail>
                  <InfoTitle>Total Calories:</InfoTitle>
                  <p>{Math.trunc(recipe?.calories)}</p>
                </InfoDetail>
                <InfoDetail>
                  <InfoTitle>Ingredients</InfoTitle>
                  <p>{[recipe?.ingredients].length}</p>
                </InfoDetail>
                <InfoDetail>
                  <InfoTitle>Servings:</InfoTitle>
                  <p>{recipe?.yield}</p>
                </InfoDetail>
                <InfoDetail>
                  <InfoTitle>Cuisine Type: </InfoTitle>
                  {recipe?.cuisineType?.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </InfoDetail>

                <InfoDetail>
                  <InfoTitle>Dish Type: </InfoTitle>
                  {recipe?.dishType?.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </InfoDetail>
              </InfoContainer>
            </div>
          </Header>

          <SpanContainer>
            {recipe?.healthLabels?.map((element, index) => (
              <Spans key={index}>{element}</Spans>
            ))}
          </SpanContainer>

          <Ingr>
            <div>
              <h2>{recipe?.ingredients?.length} Ingredients </h2>
              <ul>
                {recipe?.ingredientLines?.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Preparation</h2>
              <Button>
                <a href={recipe?.url} target="_blank">
                  Instructions
                </a>{" "}
              </Button>
              <a href={recipe?.url} target="_blank">
                on {recipe?.source}
              </a>
            </div>
          </Ingr>
        </Container>
      )}
    </>
  );
};
