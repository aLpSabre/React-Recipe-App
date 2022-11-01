import styled from "styled-components";

const Container = styled.div`

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 2.5rem;
  @media (max-width:1000px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
`;

export default Container;
