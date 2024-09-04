import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../store";
type Props = {};
const StyledAppLayout = styled.div``;
const AppLayout = (props: Props) => {
  const user = useSelector((store:RootState)=>store.user);
  const isAuthorized = !!user.token;
  return (
    <StyledAppLayout>
      {isAuthorized && <h3>Welcome, {user.username}</h3>}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
};

export default AppLayout;
