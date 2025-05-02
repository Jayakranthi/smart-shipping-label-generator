import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';

const AlertContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  background-color: ${props => {
    switch (props.type) {
      case 'success': return '#d4edda';
      case 'warning': return '#fff3cd';
      case 'danger': return '#f8d7da';
      case 'info': return '#d1ecf1';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#155724';
      case 'warning': return '#856404';
      case 'danger': return '#721c24';
      case 'info': return '#0c5460';
      default: return '#0c5460';
    }
  }};
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return '#28a745';
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      case 'info': return '#17a2b8';
      default: return '#17a2b8';
    }
  }};
`;

const IconWrapper = styled.div`
  margin-right: 0.75rem;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const AlertMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  dismissible = false,
  autoClose = false,
  autoCloseTime = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'danger': return <FaTimesCircle />;
      case 'info': return <FaInfoCircle />;
      default: return <FaInfoCircle />;
    }
  };
  
  return (
    <AlertContainer type={type}>
      <IconWrapper>{getIcon()}</IconWrapper>
      <AlertContent>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message && <AlertMessage>{message}</AlertMessage>}
      </AlertContent>
      {dismissible && (
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
      )}
    </AlertContainer>
  );
};

export default Alert;