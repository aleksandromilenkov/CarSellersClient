import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import styled from "styled-components";
import { Link  as RouterLink} from "react-router-dom";
import Footer from "../UI/Footer";

type Props = {};

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-bottom:0px;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  background-image: url('https://localhost:7209/resources/hero-image.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const StyledButtonLink = styled(RouterLink)`
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #61dafb, #21a1f1); /* Gradient background */
  color: white;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-transform: uppercase;
  margin-bottom: 0.7rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold; /* Bold text */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;

  &:hover {
    background: linear-gradient(135deg, #21a1f1, #61dafb); /* Reverse gradient on hover */
    transform: translateY(-3px); /* Lift effect on hover */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
  }

  &:active {
    background: linear-gradient(135deg, #1b8cc1, #21a1f1); /* Darker gradient on click */
    transform: translateY(0); /* Reset lift effect */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Reset shadow */
  }
`;


const FeaturedCars = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
  width: 100%;
`;

const WelcomeParagraph = styled.h3`
align-self: start;
`

const CarCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  h3 {
    margin: 10px 0;
  }

  p {
    color: #555;
  }
`;

const HomePage = (props: Props) => {
  const user = useSelector((store:RootState)=>store.user);
  const isAuthorized = !!user.token;
  return <HomePageContainer>
          {isAuthorized && <WelcomeParagraph>Welcome, {user.username}</WelcomeParagraph>}
          <StyledButtonLink to="/search">Find YOUR dream car here!</StyledButtonLink>
          <HeroSection/>
  </HomePageContainer>;
};

export default HomePage;
