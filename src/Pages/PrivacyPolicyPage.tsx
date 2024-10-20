import React from 'react';
import styled from 'styled-components';

const PrivacyPolicyContainer = styled.div`
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

const Section = styled.section`
  max-width: 800px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const SectionContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PrivacyPolicyContainer>
      <Title>Privacy Policy</Title>
      <Description>
        This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
      </Description>

      <Section>
        <SectionTitle>Information We Collect</SectionTitle>
        <SectionContent>
          We may collect the following information:
          <ul>
            <li>Your name</li>
            <li>Your email address</li>
            <li>Your phone number</li>
            <li>Information about your vehicle preferences</li>
          </ul>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>How We Use Your Information</SectionTitle>
        <SectionContent>
          We use your information to:
          <ul>
            <li>Provide you with customer support</li>
            <li>Improve our services</li>
            <li>Send you promotional emails about new cars and offers</li>
          </ul>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Data Protection</SectionTitle>
        <SectionContent>
          We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Cookies</SectionTitle>
        <SectionContent>
          Our website uses cookies to enhance user experience. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Changes to This Privacy Policy</SectionTitle>
        <SectionContent>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Contact Us</SectionTitle>
        <SectionContent>
          If you have any questions about this Privacy Policy, please contact us at:
          <br />
          <strong>Email:</strong> support@carsellers.com
          <br />
          <strong>Phone:</strong> (123) 456-7890
        </SectionContent>
      </Section>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicyPage;
