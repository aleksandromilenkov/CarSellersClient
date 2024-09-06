import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadInterface } from "./Types";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
type Props = {
  children: any;
};

const ProtectedAdminRoute = ({ children }: Props) => {
  // 1. Load atuthenticated user
  const user = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const isAuthenticated = !!user.token;
  console.log(user);
  let isAdmin = false;
  if(user.token){
    const decodedToken = jwtDecode<JwtPayloadInterface>(user.token.toString());
    const userRoles = decodedToken.role || [];
    isAdmin = userRoles.includes('Admin');
  }
  useEffect(
    function () {
      if (!isAuthenticated && !isAdmin ) navigate("/login");
    },
    [isAuthenticated, isAdmin, navigate]
  );

  // 2. If there is a user, render the app
  if (isAuthenticated && isAdmin) return children;
};

export default ProtectedAdminRoute;
