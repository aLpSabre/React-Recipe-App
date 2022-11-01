import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 0.5rem;
  width: 330px;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  background-color: #F0F5F9;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: transform 0.2s ease-in-out;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
  :hover{
    transform: scale(1.05);
  }
`;
const ImageContainer = styled.div`
  width: 300px;
  
`;
const Label = styled.div`
  width: 100%;
  height: 5vh;
  color: #11263C;
  font-weight: 500;
  font-size: 1.2rem;

`;
const Info = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: left;
  border-top: 1px solid #11263C;
  border-bottom: 1px solid #11263C;
  height: 5vh;
  margin-top: 0.4rem;
`;
const InfoDetail = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5rem;
  border-right: ${({border})=>border && "1px solid #11263C"};
  width: 100%;

`;

const InfoP=styled.p`
color: ${({primary})=>primary ? "#FC6011" : "#11263C"};

`
const Url = styled.div`
  padding: 1rem 0;

  a {
    color: #11263C;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.88rem;
  }
`;
export { Container, ImageContainer, Label, Info, InfoDetail, Url,InfoP };
