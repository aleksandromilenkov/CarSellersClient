import React from "react";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Components/Authentication/userSlice";
import { RootState } from "../store";

type Props = {};
const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const user = useSelector((state:RootState)=>state.user);
  const isAuthenticated = !!user.token;
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
        <button onClick={logoutHandler}>Logout</button>
      ) : (
        <NavLink to={"/login"}>Login</NavLink>
      )}
    </StyledHeaderMenu>
  );
};

export default Navbar;
