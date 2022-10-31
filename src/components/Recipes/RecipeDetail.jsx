import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: auto;
  flex-direction: column;
  margin: auto;
  gap: 1rem;
  color: #11263c;
  padding: 2rem 0;
  cursor: pointer;
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
    /*   border: solid 1px red; */
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
  const {
    state: { data },
  } = useLocation();
  /*   console.log(data);
  console.log(typeof data);
  console.log(data.recipe); */
  const [recipe, setRecipe] = useState([]);
/*   const get = () => {
    console.log(data.recipe.uri)
    let url =
      `https://api.edamam.com/search?app_id=61112930&app_key=617e15bff01b2760c29ccc82729d0e21&r=`;
    let uri ="http://www.edamam.com/ontologies/edamam.owl#23recipe_b79327d05b8e5b838ad6cfd9576b30b6`"

    url =url+uri.slice(0,uri.indexOf("#"))+"%"+uri.slice(uri.indexOf("#")+1,uri.length);

    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }; */

  useEffect(() => {
  /*   get(); */
 /*    console.log(recipe); */
  }, []);

  return (
    <Container key={data?.recipe?.label}>
      <h1>{data?.recipe?.label}</h1>
      <Header>
        <div>
          <ImageContainer>
            <img src={data?.recipe?.image} alt="" />
          </ImageContainer>
        </div>
        <div>
          {" "}
          <InfoContainer>
            <InfoDetail>
              <InfoTitle>Total Time:</InfoTitle>
              <p>
                {data?.recipe?.totalTime
                  ? data?.recipe?.totalTime
                  : "Not given"}
              </p>
            </InfoDetail>
            <InfoDetail>
              <InfoTitle>Total Calories:</InfoTitle>
              <p>{Math.trunc(data?.recipe?.calories)}</p>
            </InfoDetail>
            <InfoDetail>
              <InfoTitle>Ingredients</InfoTitle>
              <p>{data?.recipe?.ingredients.length}</p>
            </InfoDetail>
            <InfoDetail>
              <InfoTitle>Servings:</InfoTitle>
              <p>{data?.recipe?.yield}</p>
            </InfoDetail>
            <InfoDetail>
              <InfoTitle>Cuisine Type: </InfoTitle>
              {data?.recipe?.cuisineType.map((element) => (
                <p>{element}</p>
              ))}
            </InfoDetail>

            <InfoDetail>
              <InfoTitle>Dish Type: </InfoTitle>
              {data?.recipe?.dishType.map((element) => (
                <p>{element}</p>
              ))}
            </InfoDetail>
          </InfoContainer>
        </div>
      </Header>

      <SpanContainer>
        {data?.recipe?.healthLabels.map((element) => (
          <Spans>{element}</Spans>
        ))}
      </SpanContainer>

      <Ingr>
        <div>
          <h2>{data?.recipe?.ingredients.length} Ingredients </h2>
          <ul>
            {data?.recipe?.ingredientLines.map((element) => (
              <li>{element}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Preparation</h2>
          <Button>
            <a href={data?.recipe?.url} target="_blank">
              Instructions
            </a>{" "}
          </Button>
          <a href={data?.recipe?.url} target="_blank">
            on {data?.recipe?.source}
          </a>
        </div>
      </Ingr>
    </Container>
  );
};
