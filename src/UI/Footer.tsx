import React from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';


const FooterContainer = styled.footer`
  width:100%;
  background-color: #282c34;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin: 10px 0;
  
  a {
    color: #61dafb;
    text-decoration: none;
    margin: 0 15px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialMedia = styled.div`
  margin: 10px 0;
  
  a {
    margin: 0 10px;
    color: white;

    &:hover {
      color: #61dafb; /* Change color on hover */
    }
  }
`;

const Copyright = styled.p`
  margin-top: 15px;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/privacyPolicy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </FooterLinks>
      <SocialMedia>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-facebook" aria-hidden="true"></i>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-instagram" aria-hidden="true"></i>
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-twitter" aria-hidden="true"></i>
    </a>
      </SocialMedia>
      <Copyright>© 2024 Car Sellers Page. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
