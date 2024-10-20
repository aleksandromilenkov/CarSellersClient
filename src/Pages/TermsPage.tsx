import React from 'react';
import styled from 'styled-components';

const TermsOfServiceContainer = styled.div`
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

const TermsOfServicePage: React.FC = () => {
  return (
    <TermsOfServiceContainer>
      <Title>Terms of Service</Title>
      <Description>
        Welcome to our car selling platform. By accessing or using our services, you agree to be bound by the following terms and conditions.
      </Description>

      <Section>
        <SectionTitle>Acceptance of Terms</SectionTitle>
        <SectionContent>
          By using our services, you affirm that you are at least 18 years old and are fully able and competent to enter into, and abide by, these terms and conditions.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Modification of Terms</SectionTitle>
        <SectionContent>
          We reserve the right to modify these terms at any time. Your continued use of our services following any changes signifies your acceptance of the new terms.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>User Responsibilities</SectionTitle>
        <SectionContent>
          You agree to use our services only for lawful purposes. You must not use our services in any way that violates any applicable local, national, or international law.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Intellectual Property</SectionTitle>
        <SectionContent>
          All content on our website, including text, graphics, logos, and images, is the property of our company or our licensors and is protected by copyright and other intellectual property laws.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Limitation of Liability</SectionTitle>
        <SectionContent>
          In no event shall our company be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the use of our services.
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Governing Law</SectionTitle>
        <SectionContent>
          These terms shall be governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Contact Us</SectionTitle>
        <SectionContent>
          If you have any questions about these Terms of Service, please contact us at:
          <br />
          <strong>Email:</strong> support@carsellers.com
          <br />
          <strong>Phone:</strong> (123) 456-7890
        </SectionContent>
      </Section>
    </TermsOfServiceContainer>
  );
};

export default TermsOfServicePage;
