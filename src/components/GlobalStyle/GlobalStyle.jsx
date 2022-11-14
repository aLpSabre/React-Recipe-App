import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

*{
 margin :0 ;
 padding: 0;
 box-sizing: border-box;
}

body{
  width: 100%;
  height: 100vh;
  font-family: 'Lato', sans-serif;
  color: #11263c;

  span span:nth-child(odd){
    background-color: #11263c !important;
  }


}


`;
