import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : props.size === 'large' ? '1rem 2rem' : '0.75rem 1.5rem'};
  font-size: ${props => props.size === 'small' ? '0.875rem' : props.size === 'large' ? '1.125rem' : '1rem'};
  font-weight: 500;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  border: none;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    margin-right: ${props => props.iconOnly ? '0' : '0.5rem'};
  }
`;

const PrimaryButton = styled.button`
  ${ButtonStyles}
  background-color: var(--primary-color);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: var(--secondary-color);
  }
`;

const SecondaryButton = styled.button`
  ${ButtonStyles}
  background-color: var(--light-color);
  color: var(--text-color);
  
  &:hover:not(:disabled) {
    background-color: #e9ecef;
  }
`;

const OutlineButton = styled.button`
  ${ButtonStyles}
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  
  &:hover:not(:disabled) {
    background-color: var(--primary-color);
    color: white;
  }
`;

const DangerButton = styled.button`
  ${ButtonStyles}
  background-color: var(--danger-color);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #c0392b;
  }
`;

const SuccessButton = styled.button`
  ${ButtonStyles}
  background-color: var(--success-color);
  color: white;
  
  &:hover:not(:disabled) {
    background-color: #27ae60;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  iconOnly = false,
  ...props 
}) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton type={type} size={size} iconOnly={iconOnly} {...props}>{children}</SecondaryButton>;
    case 'outline':
      return <OutlineButton type={type} size={size} iconOnly={iconOnly} {...props}>{children}</OutlineButton>;
    case 'danger':
      return <DangerButton type={type} size={size} iconOnly={iconOnly} {...props}>{children}</DangerButton>;
    case 'success':
      return <SuccessButton type={type} size={size} iconOnly={iconOnly} {...props}>{children}</SuccessButton>;
    default:
      return <PrimaryButton type={type} size={size} iconOnly={iconOnly} {...props}>{children}</PrimaryButton>;
  }
};

export default Button;