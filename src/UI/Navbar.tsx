import React from "react";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Components/Authentication/userSlice";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import { CLAIM_TYPES } from "../Utils/Helpers/constants";
import { JwtPayloadInterface } from "../Utils/Helpers/Types";

type Props = {};
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
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
    navigate("/login");
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
        <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <NavLink to={"/login"}>Login</NavLink>
      )}
    </StyledHeaderMenu>
  );
};

export default Navbar;
