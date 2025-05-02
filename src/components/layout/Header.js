import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaShippingFast, FaCog, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.8rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <FaShippingFast />
          <span>Smart Shipping</span>
        </Logo>
        <Nav>
          <NavLink to="/create-label">
            <FaPlus />
            Create Label
          </NavLink>
          <NavLink to="/settings">
            <FaCog />
            Settings
          </NavLink>
        </Nav>
        <MobileMenuButton>☰</MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;