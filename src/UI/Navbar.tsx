import React from "react";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Components/Authentication/userSlice";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import { CLAIM_TYPES } from "../Utils/Helpers/constants";
import { JwtPayloadInterface } from "../Utils/Helpers/Types";

type Props = {};
export const StyledHeaderMenu = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const NavLink = styled(RouterNavLink)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &.active {
    background-color: #61dafb;
    color: #282c34;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff1a1a;
  }
`;
const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state:RootState)=>state.user);
  const isAuthenticated = !!user.token;
  let isAdmin = false;
  if(user.token){
    const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
    const userRoles = decodedToken.role || [];
    isAdmin = userRoles.includes('Admin');
  }
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenCarSellers");
    // navigate("/login");
  };
  return (
    <StyledHeaderMenu>
      <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/search"}>Search</NavLink>
      {isAuthenticated && <NavLink to={"/favorites"}>Favorites</NavLink>}

      <NavLink to={"/companies"}>Car Seller Companies</NavLink>
      {isAuthenticated ? (
        <>
        {isAdmin && <NavLink to={"/adminPanel"}>Admin Panel </NavLink>}
        <NavLink to={"/profile"}>Profile</NavLink>
        <NavLink to="/login" onClick={logoutHandler}>Logout</NavLink>
        </>
      ) : (
        <NavLink to={"/login"}>Login</NavLink>
      )}
    </StyledHeaderMenu>
  );
};

export default Navbar;
