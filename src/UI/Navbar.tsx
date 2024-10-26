import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import { Link, NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Components/Authentication/userSlice";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import { CLAIM_TYPES } from "../Utils/Helpers/constants";
import { JwtPayloadInterface } from "../Utils/Helpers/Types";

type Props = {};

const StyledHeaderMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(RouterNavLink)`
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

const LogoutButton = styled.button`
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

const BurgerMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  cursor: pointer;

  div {
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 4px 0;
    transition: 0.4s;
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg) translate(5px, 5px)" : "none")};
  }

  div:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
  }

  div:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none")};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MenuItems = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #282c34;
  width: 100%;
  transition: max-height 0.3s ease;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  z-index: 1;

  @media (min-width: 769px) {
    display: flex;
    position: static;
    flex-direction: row;
    max-height: none;
    justify-content: space-around;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  max-width: 100%;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 120px;
  }
`;

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = !!user.token;
  let isAdmin = false;

  if (user.token) {
    const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
    const userRoles = decodedToken.role || [];
    isAdmin = userRoles.includes("Admin");
  }

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    localStorage.removeItem("tokenCarSellers");
    navigate("/login");
  };

  // Function to close the menu when a link is clicked
  const handleNavLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <StyledHeaderMenu>
      <LogoContainer>
        <Link to='/home'><Logo src="https://localhost:7209/resources/CarSellersLogo.png" alt="logo" /></Link>
      </LogoContainer>
      <BurgerMenu isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <div />
        <div />
        <div />
      </BurgerMenu>
      <MenuItems isOpen={isOpen}>
        <NavLink to={"/home"} onClick={handleNavLinkClick}>Home</NavLink>
        <NavLink to={"/search"} onClick={handleNavLinkClick}>Search</NavLink>
        {isAuthenticated && <NavLink to={"/favorites"} onClick={handleNavLinkClick}>Favorites</NavLink>}
        <NavLink to={"/companies"} onClick={handleNavLinkClick}>Car Seller Companies</NavLink>
        {isAuthenticated ? (
          <>
            {isAdmin && <NavLink to={"/adminPanel"} onClick={handleNavLinkClick}>Admin Panel </NavLink>}
            <NavLink to={"/profile"} onClick={handleNavLinkClick}>Profile</NavLink>
            <NavLink to="/login" onClick={() => { logoutHandler(); handleNavLinkClick(); }}>Logout</NavLink>
          </>
        ) : (
          <NavLink to={"/login"} onClick={handleNavLinkClick}>Login</NavLink>
        )}
      </MenuItems>
    </StyledHeaderMenu>
  );
};

export default Navbar;
