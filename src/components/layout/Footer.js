import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--dark-color);
  color: white;
  padding: 1.5rem 0;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  a {
    color: white;
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          &copy; {currentYear} Smart Shipping Label Generator. All rights reserved.
        </Copyright>
        <FooterLinks>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;