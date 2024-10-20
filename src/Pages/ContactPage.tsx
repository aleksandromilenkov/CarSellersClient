import React from 'react';
import styled from 'styled-components';

const ContactPageContainer = styled.div`
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical; /* Allows vertical resizing */
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #61dafb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #21a1f1; /* Darker shade on hover */
  }
`;

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    alert("Form submitted!");
  };

  return (
    <ContactPageContainer>
      <Title>Contact Us</Title>
      <Description>
        We would love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.
      </Description>
      <FormContainer onSubmit={handleSubmit}>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <TextArea placeholder="Your Message" required />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </FormContainer>
    </ContactPageContainer>
  );
};

export default ContactPage;
