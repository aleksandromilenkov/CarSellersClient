import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Full height of the viewport */
`;

const MainContent = styled.main`
  flex: 1; /* Takes up remaining space */
`;

type Props = {};
const AppLayout = (props: Props) => {
  return (
    <StyledAppLayout>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer/>
    </StyledAppLayout>
  );
};

export default AppLayout;
