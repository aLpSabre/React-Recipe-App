import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import hamburger from "../../img/icon-hamburger.svg";
import close from "../../img/icon-close.svg";
const Header = styled.header`
  width: 100%;
  background-color: #11263c;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div > a {
    font-size: 1.5rem;
    color: #fc6011;
  }

  a {
    color: #f0f5f9;
    text-decoration: none;
    :hover {
      color: #fc6011;
    }
  }
  img {
    display: none;
  }
  @media (max-width: 880px) {
    padding: 2rem 1rem;

    img {
      display: inline-block;
    }
  }
`;

const UL = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 3rem;
  @media (max-width: 880px) {
    flex-direction: column;
    gap: 2rem;
    padding-top: 1.2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  overflow: hidden;
  
  @media (max-width: 1200px) {
    width: 90%;
    h1 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 880px) {
    width: 95%;
    flex-direction: column;
    /*   height: 25vh; */
    transition: height 0.5s ease-in-out;
    height: ${({ primary }) => (primary === "show" ? "20vh" : "4vh")};
    .md-toggle {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  @media (max-height:800px){
    height: ${({ primary }) => (primary === "show" ? "25vh" : "5vh")};
  }
`;

export const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <Header>
      <Nav primary={show ? "show" : "notshow"}>
        <div className="md-toggle">
          <NavLink className="logo" to="/">
            The World's Food
          </NavLink>
          <div>
            <img
              src={show ? close : hamburger}
              alt="hamburger"
              onClick={() => setShow(!show)}
              className="hamburger"
            />
          </div>
        </div>

        <UL>
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive && "#fc6011",
              })}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/survey"
              style={({ isActive }) => ({
                color: isActive && "#fc6011",
              })}
            >
              Survey
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mealplanner"
              style={({ isActive }) => ({
                color: isActive && "#fc6011",
              })}
            >
              Meal Planner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: isActive && "#fc6011",
              })}
            >
            Login
            </NavLink>
          </li>
        </UL>
      </Nav>
    </Header>
  );
};
