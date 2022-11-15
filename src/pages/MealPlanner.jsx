import React from "react";
import styled from "styled-components";
import coming from "../img/SL-043020-30500-40.jpg";

const Container = styled.div`
  width: 100%;
  height: 89.3vh;
  text-align: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  }
  @media (max-width: 800px) {
    img {
      object-fit: cover;
    }
  }

  a {
    position: absolute;
    background-color: white;
    bottom: 10px;
    right: 0;
    text-decoration: none;
    color: black;
    font-size: 0.8rem;
  }
`;
export const MealPlanner = () => {
  return (
    <Container>
      <img src={coming} alt="coming" />
      <a href="https://de.freepik.com/vektoren-kostenlos/im-bau-mit-schwarzen-und-gelben-streifen_13197704.htm#query=under%20construction&position=0&from_view=keyword"  rel="noreferrer" target={"_blank"}>Bild von starline auf Freepik</a> 
    </Container>
  );
};
