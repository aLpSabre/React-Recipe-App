import food from "../img/pexels-ella-olsson-1640777.jpg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";




const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 92vh;
  color: #11263c;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #f0f5f9;

  h1 {
    color: #fc6011;
    font-size: 2.6rem;
  }
  p {
    font-weight: bold;
    font-size: 1.3rem;
  }
`;
const Button = styled.button`
  width: 120px;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: white;
  background-color: #fc6011;
  cursor: pointer;
`;

export const Home = () => {
  const navigate=useNavigate();
  return (
    <Container>
      <ImageContainer>
        <img src={food} alt="" />
      </ImageContainer>

      <InfoContainer>
        <h1>Welcome To The World's Food</h1>
        <p>Start exploring the Recipes..</p>
        <Button onClick={() => navigate("survey")}>Begin!</Button>
      </InfoContainer>
    </Container>
  );
};
