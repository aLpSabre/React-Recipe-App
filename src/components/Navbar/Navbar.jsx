import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
  @media (max-width: 880px) {
    div > a {
      font-size: 1.3rem;
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
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  @media (max-width: 1200px) {
    width: 90%;
    h1 {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 880px) {
    /*     width: 90%; */
  }
`;

export const Navbar = () => {
  return (
    <Header>
      <Nav>
        <div>
          <NavLink
            className="logo"
            to="/"
          
          >
            The World's Food
          </NavLink>
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
        </UL>
      </Nav>
    </Header>
  );
};
