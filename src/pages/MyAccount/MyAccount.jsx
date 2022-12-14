import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  Container,
  OutletContainer,
  ProfileInfo,
  SectionContainer,
} from "./MyAccount.styled";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { NavLink } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
export const MyAccount = () => {
  const { currentUser } = useAuthContext();

  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {

    currentUser && setTimeout(() => setDataLoading(false), 1000);
  }, [currentUser]);
  return (
    <Container>
      <SectionContainer>
        <ProfileInfo>
          <AccountBoxIcon sx={{ fontSize: "8rem", color: "#11263c" }} />
          {dataLoading ? (
            <ClipLoader color={"#FC6011"} size={30} speedMultiplier={1} />
          ) : (
            <p
              style={{ textAlign: "left", color: "#fc6011", fontWeight: "600" }}
            >
              Hello {currentUser.displayName}!
            </p>
          )}
        </ProfileInfo>
        <NavLink
          to="personalInfo"
          style={({ isActive }) => ({
            color: isActive && "#fc6011",
            borderLeft: isActive && "solid 5px #fc6011",
          })}
        >
          Personal Info
        </NavLink>
        <NavLink
          to="changePassword"
          style={({ isActive }) => ({
            color: isActive && "#fc6011",
            borderLeft: isActive && "solid 5px #fc6011",
          })}
        >
          Change Password
        </NavLink>
        <NavLink
          to="savedRecipes"
          style={({ isActive }) => ({
            color: isActive && "#fc6011",
            borderLeft: isActive && "solid 5px #fc6011",
          })}
        >
          Saved Recipes
        </NavLink>
      </SectionContainer>
      <OutletContainer>
        <Outlet></Outlet>
      </OutletContainer>
    </Container>
  );
};
