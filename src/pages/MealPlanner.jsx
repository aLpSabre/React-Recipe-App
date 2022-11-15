import React from "react";
import styled from "styled-components";
import coming from "../img/SL-043020-30500-40.jpg"

const Container =styled.div`
width: 100%;
height: 90vh;
text-align: center;

img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: auto;
}
@media (max-width: 800px) {
  img{
 

  object-fit: cover;
}
}

`
export const MealPlanner = () => {
  return (<Container><img src={coming} alt="coming" /></Container>);
};
