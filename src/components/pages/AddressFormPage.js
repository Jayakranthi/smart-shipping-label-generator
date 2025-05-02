import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import AddressForm from '../forms/AddressForm';
import Button from '../common/Button';

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  margin: 0;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--primary-color)' : '#e9ecef'};
  color: ${props => props.active ? 'white' : 'var(--text-light)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.active ? 'var(--text-color)' : 'var(--text-light)'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const StepConnector = styled.div`
  height: 2px;
  width: 30px;
  background-color: #e9ecef;
`;

const BackButton = styled(Button)`
  margin-right: 1rem;
`;

const AddressFormPage = () => {
  const navigate = useNavigate();
  
  const handleAddressSubmit = (data) => {
    // In a real app, you would save this data to state or context
    // and then navigate to the next step
    navigate('/preview-label/123');
  };
  
  return (
    <div>
      <PageHeader>
        <PageTitle>Create Shipping Label</PageTitle>
        <StepIndicator>
          <StepCircle active>1</StepCircle>
          <StepLabel active>Address</StepLabel>
          <StepConnector />
          <StepCircle>2</StepCircle>
          <StepLabel>Shipping Options</StepLabel>
          <StepConnector />
          <StepCircle>3</StepCircle>
          <StepLabel>Preview & Print</StepLabel>
        </StepIndicator>
      </PageHeader>
      
      <AddressForm onSubmit={handleAddressSubmit} />
      
      <div className="mt-3">
        <BackButton 
          variant="secondary" 
          onClick={() => navigate('/')}
        >
          <FaArrowLeft />
          Back to Home
        </BackButton>
      </div>
    </div>
  );
};

export default AddressFormPage;