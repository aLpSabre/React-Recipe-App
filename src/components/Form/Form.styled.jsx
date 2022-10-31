import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 25%;
  min-height: 120vh;
  gap: 0.5rem;
  padding: 2rem;
  border-right: solid 3px #f97b3b;
  border-top: solid 3px #f97b3b;
  border-bottom: solid 3px #f97b3b;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #11263c;
  cursor: pointer;

  input[type="number"] {
    width: 60px;
    padding: 4px 8px;
    border-radius: 10px;
    outline: none;
    border: solid 1px #11263c;
    margin: 5px;
  }

  input[type="text"] {
    padding: 10px;
    border: solid 1px #11263c;
    outline: none;
    border-radius: 10px;
    margin-bottom: 0.7rem;
  }
  input[type="checkbox"],
  input[type="radio"] {
    position: relative;
    width: 1.5em;
    height: 1.5em;
    color: black;
    border: 1px solid gray;
    border-radius: 4px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: "";
      display: block;
      top: 0px;
      left: 6px;
      width: 6px;
      height: 14px;
      border-style: solid;
      border-color: #f97b3b;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
    }
    &:checked {
      color: #fc6011;
      border-color: #11263c;
      background: #11263c;
      &::before {
        opacity: 1;
      }
    }
  }
`;

const RecipeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  min-height: 120vh;
  gap: 2rem;
  cursor: pointer;

`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  font-weight: bold;
`;

const CheckContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  font-weight: normal;
`;

const RangeContainer = styled(CheckContainer)``;

const RangeInput = styled.input`
  width: 40px;
  padding: 1px;
`;

const ButtonContainer = styled(CheckContainer)`
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const Button = styled.button`
  width: 120px;
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  color: white;
  background-color: ${({ primary }) => (primary ? "#11263C" : "#FC6011")};
  cursor: pointer;
`;

export {
  FormContainer,
  OptionContainer,
  CheckContainer,
  RangeContainer,
  RangeInput,
  ButtonContainer,
  Button,
  RecipeContainer,
};
