import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '../common/Button';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Icon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 1rem;
`;

const SuccessPage = () => {
  const navigate = useNavigate();
  
  return (
    <Container>
      <Icon />
      <h1>Success!</h1>
      <p>Your shipping label has been generated successfully.</p>
      <Button onClick={() => navigate('/')}>Create Another Label</Button>
    </Container>
  );
};

export default SuccessPage; 