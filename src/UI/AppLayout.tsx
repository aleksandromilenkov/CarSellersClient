import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
type Props = {};
const StyledAppLayout = styled.div``;
const AppLayout = (props: Props) => {
  return (
    <StyledAppLayout>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </StyledAppLayout>
  );
};

export default AppLayout;
