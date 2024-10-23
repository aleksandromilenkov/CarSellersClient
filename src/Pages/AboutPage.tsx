import React from 'react';
import styled from 'styled-components';

const AboutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f8f9fa; /* Light background */
  color: #333;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 800px;
  text-align: center;
  margin-bottom: 40px;
`;

const TeamSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const TeamMembers = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const MemberCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 200px;

  h3 {
    margin: 10px 0;
    font-size: 1.5rem;
  }

  p {
    color: #222;
    font-size: 0.9rem;
  }
`;

const AboutPage = () => {
  const teamMembers = [
    { name: 'Aleksandro Milenkov', role: 'CEO' },
    { name: 'Martin Zdravkovski', role: 'Sales Manager' },
    { name: 'Stefan Jakimovski', role: 'Marketing Director' },
    { name: 'Simona Hristova', role: 'Customer Support' },
  ];

  return (
    <AboutPageContainer>
      <Title>About Us</Title>
      <Description>
        Welcome to our car selling company! We are dedicated to helping you find your perfect vehicle. 
        With a wide range of cars from various brands, we offer exceptional customer service and competitive prices.
      </Description>
      <TeamSection>
        <TeamTitle>Meet Our Team</TeamTitle>
        <TeamMembers>
          {teamMembers.map((member, index) => (
            <MemberCard key={index}>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </MemberCard>
          ))}
        </TeamMembers>
      </TeamSection>
    </AboutPageContainer>
  );
};

export default AboutPage;
