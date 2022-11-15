import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  min-height: 80vh;
  border-radius: 10px;
  margin: auto;
  margin-top: 2.5rem;
  gap: 1rem;
  @media (max-width: 1000px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
  }
`;

export const SectionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: left;
  flex-direction: column;
  border-right: solid 1px #fc6011;
  width: 25%;
  height: 100%;
  padding: 1rem;
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
  @media (max-width: 1000px) {
    width: 80%;
    border: none;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 15vh;
  border-bottom: solid 1px rgb(55, 65, 81);
  gap: 0.5rem;
  @media (max-width: 1000px) {
    justify-content: left;
  }
`;
export const OutletContainer = styled.div`
  width: 100%;
  min-height: 30vh;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  @media (max-width: 1000px) {
    justify-content: center;
    align-items: flex-start;
  }
`;
