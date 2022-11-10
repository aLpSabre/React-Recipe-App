import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 80%;

  margin: auto;
  height: 80vh;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -55%);
  border-radius: 10px;
  a {
    text-decoration: none;
    color: #11263c;
    border-bottom: 1px solid rgb(55, 65, 81);
    padding: 0.7rem;
    cursor: pointer;
    :hover {
      color: #fc6011;
      background-color: #11263c;
    }
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  border-right: solid 1px rgb(55, 65, 81);
  width: 25%;
  height: 100%;
  padding: 1rem;
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
  width: 100%;
  height: 20vh;
  border-bottom: solid 1px rgb(55, 65, 81);
  gap: 0.5rem;
`;
export const OutletContainer=styled.div`
width: 70%;
height: 100%;

`