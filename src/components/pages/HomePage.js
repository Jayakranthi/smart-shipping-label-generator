import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShippingFast, FaCheckCircle, FaFileAlt, FaCog, FaPlus } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ActionSection = styled.section`
  background-color: #f8f9fa;
  padding: 3rem 2rem;
  text-align: center;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
`;

const ActionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
`;

const ActionDescription = styled.p`
  max-width: 700px;
  margin: 0 auto 2rem;
  color: var(--text-light);
  font-size: 1rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RecentLabelsSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  color: var(--text-light);
`;

const ApiSection = styled.section`
  margin-bottom: 2rem;
`;

const ApiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ApiCard = styled(Card)`
  text-align: center;
  padding: 1.5rem;
`;

const ApiLogo = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ApiDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const HomePage = () => {
  // In a real app, you would fetch recent labels from an API or local storage
  const recentLabels = [];
  
  return (
    <div>
      <HeroSection>
        <FaShippingFast size={60} style={{ marginBottom: '1rem' }} />
        <HeroTitle>Smart Shipping Label Generator</HeroTitle>
        <HeroSubtitle>
          Generate professional shipping labels with real-time address validation, 
          ensuring accurate deliveries and reducing shipping errors.
        </HeroSubtitle>
        <Link to="/create-label">
          <Button variant="secondary" size="large">
            <FaPlus />
            Create New Label
          </Button>
        </Link>
      </HeroSection>
      
      <FeaturesGrid>
        <FeatureCard>
          <FeatureIcon>
            <FaCheckCircle />
          </FeatureIcon>
          <FeatureTitle>Address Validation</FeatureTitle>
          <FeatureDescription>
            Verify and standardize addresses in real-time using Google Address Validation API
            to ensure accurate deliveries.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <FaFileAlt />
          </FeatureIcon>
          <FeatureTitle>Dynamic Label Creation</FeatureTitle>
          <FeatureDescription>
            Generate professional shipping labels in various formats with customizable
            options for different carriers using EasyPost API.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureIcon>
            <FaCog />
          </FeatureIcon>
          <FeatureTitle>Customizable Settings</FeatureTitle>
          <FeatureDescription>
            Configure default settings for your shipping preferences, including
            preferred carriers, service types, and packaging.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
      
      <ApiSection>
        <SectionTitle>Powered By Open APIs</SectionTitle>
        <ApiGrid>
          <ApiCard>
            <ApiLogo>Google Address Validation API</ApiLogo>
            <ApiDescription>
              Validates and standardizes addresses to ensure accurate deliveries
              using Google's powerful address validation technology.
            </ApiDescription>
          </ApiCard>
          
          <ApiCard>
            <ApiLogo>EasyPost API</ApiLogo>
            <ApiDescription>
              Generates shipping labels for multiple carriers including USPS, UPS,
              FedEx, and DHL with real-time rates and tracking.
            </ApiDescription>
          </ApiCard>
          
          <ApiCard>
            <ApiLogo>USPS Web Tools API</ApiLogo>
            <ApiDescription>
              Provides additional address verification and standardization
              specifically for USPS shipments.
            </ApiDescription>
          </ApiCard>
        </ApiGrid>
      </ApiSection>
      
      <ActionSection>
        <ActionTitle>Ready to Create Your First Shipping Label?</ActionTitle>
        <ActionDescription>
          Our smart shipping label generator makes it easy to create professional
          shipping labels with validated addresses. Get started now to streamline
          your shipping process.
        </ActionDescription>
        <ButtonGroup>
          <Link to="/create-label">
            <Button variant="primary" size="large">
              <FaPlus />
              Create New Label
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="outline" size="large">
              <FaCog />
              Configure Settings
            </Button>
          </Link>
        </ButtonGroup>
      </ActionSection>
      
      <RecentLabelsSection>
        <SectionTitle>Recent Labels</SectionTitle>
        {recentLabels.length > 0 ? (
          <div>
            {/* Display recent labels here */}
          </div>
        ) : (
          <EmptyState>
            <FaFileAlt size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>No Recent Labels</h3>
            <p>You haven't created any shipping labels yet.</p>
            <Link to="/create-label">
              <Button variant="primary" style={{ marginTop: '1rem' }}>
                Create Your First Label
              </Button>
            </Link>
          </EmptyState>
        )}
      </RecentLabelsSection>
    </div>
  );
};

export default HomePage;