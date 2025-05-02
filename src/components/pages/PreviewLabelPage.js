import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../common/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const LabelPreview = styled.div`
  border: 1px solid #ddd;
  padding: 2rem;
  margin: 2rem 0;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const PreviewLabelPage = () => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    // In a real app, you would handle the actual printing
    // For now, we'll just navigate to a success page
    navigate('/success');
  };
  
  return (
    <Container>
      <h1>Preview Your Shipping Label</h1>
      <LabelPreview>
        {/* This would be replaced with actual label preview */}
        <p>Shipping Label Preview</p>
      </LabelPreview>
      <ButtonContainer>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <Button onClick={handlePrint} primary>
          Print Label <FaArrowRight />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default PreviewLabelPage; 