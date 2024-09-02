import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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

const ProtectedRoute = ({ children }: Props) => {
  // 1. Load atuthenticated user
  const user = useSelector((state:RootState) => state.user);
  const navigate = useNavigate();
  const isAuthenticated = !!user.token;
  console.log(user);
  useEffect(
    function () {
      if (!isAuthenticated ) navigate("/login");
    },
    [isAuthenticated, navigate]
  );

  // 2. If there is a user, render the app
  if (isAuthenticated) return children;
};

export default ProtectedRoute;
