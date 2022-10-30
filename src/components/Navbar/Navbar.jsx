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
  a {
    color: #f0f5f9;
    text-decoration: none;
    :hover {
      color: #fc6011;
    }
  }
`;

const UL = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  gap: 3rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
`;

export const Navbar = () => {
  return (
    <Header>
      <Nav>
        <div>
          <NavLink to="/" style={{ fontSize: "1.5rem", color: "#FC6011" }}>
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
