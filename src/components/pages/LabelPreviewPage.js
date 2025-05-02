import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaDownload, FaPrint, FaEnvelope, FaEdit } from 'react-icons/fa';
import Card from '../common/Card';
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
  background-color: ${props => props.active ? 'var(--primary-color)' : props.completed ? 'var(--success-color)' : '#e9ecef'};
  color: ${props => (props.active || props.completed) ? 'white' : 'var(--text-light)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const StepLabel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.active ? 'var(--text-color)' : props.completed ? 'var(--success-color)' : 'var(--text-light)'};
  font-weight: ${props => (props.active || props.completed) ? '600' : '400'};
`;

const StepConnector = styled.div`
  height: 2px;
  width: 30px;
  background-color: ${props => props.completed ? 'var(--success-color)' : '#e9ecef'};
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const LabelPreview = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  padding: 1rem;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow);
`;

const LabelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const CarrierLogo = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary-color);
`;

const ShippingMethod = styled.div`
  font-size: 0.9rem;
  background-color: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const AddressSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AddressBlock = styled.div`
  h4 {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--text-light);
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.4;
  }
`;

const Barcode = styled.div`
  height: 100px;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: var(--text-light);
`;

const TrackingNumber = styled.div`
  font-size: 0.9rem;
  text-align: center;
  font-family: monospace;
  letter-spacing: 1px;
`;

const ShippingDetails = styled.div`
  margin-top: auto;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  font-size: 0.8rem;
  color: var(--text-light);
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BackButton = styled(Button)`
  margin-right: 1rem;
`;

// Mock data for the label preview (in a real app, this would come from EasyPost API)
const mockLabelData = {
  carrier: 'USPS',
  service: 'Priority Mail',
  trackingNumber: '9400 1000 0000 0000 0000 00',
  sender: {
    name: 'Your Company',
    street1: '123 Business St',
    street2: 'Suite 100',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'US'
  },
  recipient: {
    name: 'John Doe',
    street1: '456 MAIN ST',
    street2: 'APT 4B',
    city: 'NEW YORK',
    state: 'NY',
    zipCode: '10001-0000',
    country: 'US'
  },
  weight: '2 lbs',
  dimensions: '12 x 9 x 2 in',
  shippingDate: '05/01/2025',
  deliveryDate: '05/04/2025',
  labelUrl: 'https://easypost-files.s3.us-west-2.amazonaws.com/files/postage_label/sample.png' // This would be a real URL from EasyPost in a production app
};

const LabelPreviewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [labelData] = useState(mockLabelData);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real app, this would download the label PDF from EasyPost
    alert('In a real app, this would download the label as a PDF from EasyPost');
  };
  
  const handleEmail = () => {
    // In a real app, this would open an email dialog
    alert('In a real app, this would allow you to email the label');
  };
  
  return (
    <div>
      <PageHeader>
        <PageTitle>Preview Shipping Label</PageTitle>
        <StepIndicator>
          <StepCircle completed>1</StepCircle>
          <StepLabel completed>Address</StepLabel>
          <StepConnector completed />
          <StepCircle completed>2</StepCircle>
          <StepLabel completed>Shipping Options</StepLabel>
          <StepConnector completed />
          <StepCircle active>3</StepCircle>
          <StepLabel active>Preview & Print</StepLabel>
        </StepIndicator>
      </PageHeader>
      
      <PreviewContainer>
        <Card title="Label Preview (Generated by EasyPost)">
          <LabelPreview>
            <LabelHeader>
              <CarrierLogo>{labelData.carrier}</CarrierLogo>
              <ShippingMethod>{labelData.service}</ShippingMethod>
            </LabelHeader>
            
            <AddressSection>
              <AddressBlock>
                <h4>From:</h4>
                <p>
                  {labelData.sender.name}<br />
                  {labelData.sender.street1}<br />
                  {labelData.sender.street2 && `${labelData.sender.street2}<br />`}
                  {labelData.sender.city}, {labelData.sender.state} {labelData.sender.zipCode}
                </p>
              </AddressBlock>
              
              <AddressBlock>
                <h4>To:</h4>
                <p>
                  {labelData.recipient.name}<br />
                  {labelData.recipient.street1}<br />
                  {labelData.recipient.street2 && `${labelData.recipient.street2}<br />`}
                  {labelData.recipient.city}, {labelData.recipient.state} {labelData.recipient.zipCode}
                </p>
              </AddressBlock>
            </AddressSection>
            
            <Barcode>
              [Barcode Placeholder - EasyPost Generated]
            </Barcode>
            
            <TrackingNumber>
              {labelData.trackingNumber}
            </TrackingNumber>
            
            <ShippingDetails>
              <div>Weight: {labelData.weight}</div>
              <div>Dimensions: {labelData.dimensions}</div>
              <div>Ship Date: {labelData.shippingDate}</div>
              <div>Expected Delivery: {labelData.deliveryDate}</div>
            </ShippingDetails>
          </LabelPreview>
        </Card>
        
        <ActionButtons>
          <Card title="Label Actions">
            <p>Your shipping label is ready! You can now print it, download it as a PDF, or email it.</p>
            
            <div className="mt-3">
              <Button 
                variant="primary" 
                onClick={handlePrint}
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                <FaPrint />
                Print Label
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={handleDownload}
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                <FaDownload />
                Download PDF
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleEmail}
                style={{ width: '100%' }}
              >
                <FaEnvelope />
                Email Label
              </Button>
            </div>
          </Card>
          
          <Card title="Need to Make Changes?">
            <p>If you need to edit the shipping information or options, you can go back to the previous steps.</p>
            
            <div className="mt-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/create-label')}
                style={{ width: '100%' }}
              >
                <FaEdit />
                Edit Shipping Information
              </Button>
            </div>
          </Card>
        </ActionButtons>
      </PreviewContainer>
      
      <div className="mt-3">
        <BackButton 
          variant="secondary" 
          onClick={() => navigate('/create-label')}
        >
          <FaArrowLeft />
          Back to Shipping Options
        </BackButton>
      </div>
    </div>
  );
};

export default LabelPreviewPage;