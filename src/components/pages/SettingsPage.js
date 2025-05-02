import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaSave, FaUndo } from 'react-icons/fa';
import Card from '../common/Card';
import Button from '../common/Button';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormCheckbox from '../forms/FormCheckbox';
import Alert from '../common/Alert';

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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const BackButton = styled(Button)`
  margin-right: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

// Mock data for shipping carriers and service types
const CARRIERS = [
  { value: 'usps', label: 'USPS' },
  { value: 'ups', label: 'UPS' },
  { value: 'fedex', label: 'FedEx' },
  { value: 'dhl', label: 'DHL' }
];

const SERVICE_TYPES = {
  usps: [
    { value: 'priority', label: 'Priority Mail' },
    { value: 'first_class', label: 'First Class Mail' },
    { value: 'ground', label: 'USPS Ground Advantage' },
    { value: 'express', label: 'Priority Mail Express' }
  ],
  ups: [
    { value: 'ground', label: 'UPS Ground' },
    { value: '3day', label: 'UPS 3 Day Select' },
    { value: '2day', label: 'UPS 2nd Day Air' },
    { value: 'next_day', label: 'UPS Next Day Air' }
  ],
  fedex: [
    { value: 'ground', label: 'FedEx Ground' },
    { value: 'express_saver', label: 'FedEx Express Saver' },
    { value: '2day', label: 'FedEx 2Day' },
    { value: 'overnight', label: 'FedEx Standard Overnight' }
  ],
  dhl: [
    { value: 'express', label: 'DHL Express' },
    { value: 'parcel', label: 'DHL Parcel' }
  ]
};

const PACKAGE_TYPES = [
  { value: 'custom', label: 'Custom Dimensions' },
  { value: 'letter', label: 'Letter/Envelope' },
  { value: 'small_box', label: 'Small Box' },
  { value: 'medium_box', label: 'Medium Box' },
  { value: 'large_box', label: 'Large Box' }
];

const SettingsPage = () => {
  const navigate = useNavigate();
  
  // Default settings
  const defaultSettings = {
    // API Settings
    googleApiKey: '',
    easypostApiKey: '',
    uspsApiKey: '',
    
    // Default Shipping Preferences
    defaultCarrier: 'usps',
    defaultServiceType: 'priority',
    defaultPackageType: 'medium_box',
    
    // Custom Package Dimensions (for custom package type)
    length: '12',
    width: '9',
    height: '2',
    weight: '1',
    
    // Sender Information
    senderName: '',
    senderCompany: '',
    senderStreet1: '',
    senderStreet2: '',
    senderCity: '',
    senderState: '',
    senderZipCode: '',
    senderCountry: 'US',
    senderPhone: '',
    senderEmail: '',
    
    // Options
    saveAddressHistory: true,
    autoValidateAddresses: true,
    showDeliveryEstimates: true,
    emailLabelCopy: false
  };
  
  const [settings, setSettings] = useState(defaultSettings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [serviceTypes, setServiceTypes] = useState(SERVICE_TYPES[defaultSettings.defaultCarrier]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Update service types when carrier changes
    if (name === 'defaultCarrier') {
      setServiceTypes(SERVICE_TYPES[value]);
      // Reset service type to first option of new carrier
      setSettings(prev => ({
        ...prev,
        defaultServiceType: SERVICE_TYPES[value][0].value
      }));
    }
  };
  
  const handleReset = () => {
    setSettings(defaultSettings);
    setServiceTypes(SERVICE_TYPES[defaultSettings.defaultCarrier]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would save these settings to localStorage or an API
    console.log('Saving settings:', settings);
    
    // Show success message
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  return (
    <div>
      <PageHeader>
        <PageTitle>Settings</PageTitle>
      </PageHeader>
      
      {saveSuccess && (
        <Alert 
          type="success" 
          message="Settings saved successfully!" 
          dismissible 
          onClose={() => setSaveSuccess(false)} 
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <SettingsGrid>
          <div>
            <Card title="API Settings">
              <SectionTitle>Address Validation & Label Generation APIs</SectionTitle>
              <FormInput
                name="googleApiKey"
                label="Google Address Validation API Key"
                placeholder="Enter your Google API key"
                value={settings.googleApiKey}
                onChange={handleChange}
              />
              
              <FormInput
                name="easypostApiKey"
                label="EasyPost API Key"
                placeholder="Enter your EasyPost API key"
                value={settings.easypostApiKey}
                onChange={handleChange}
              />
              
              <FormInput
                name="uspsApiKey"
                label="USPS Web Tools API Key (Optional)"
                placeholder="Enter your USPS API key"
                value={settings.uspsApiKey}
                onChange={handleChange}
              />
            </Card>
            
            <Card title="Default Shipping Preferences" style={{ marginTop: '2rem' }}>
              <FormSelect
                name="defaultCarrier"
                label="Preferred Carrier"
                options={CARRIERS}
                value={settings.defaultCarrier}
                onChange={handleChange}
              />
              
              <FormSelect
                name="defaultServiceType"
                label="Default Service Type"
                options={serviceTypes}
                value={settings.defaultServiceType}
                onChange={handleChange}
              />
              
              <FormSelect
                name="defaultPackageType"
                label="Default Package Type"
                options={PACKAGE_TYPES}
                value={settings.defaultPackageType}
                onChange={handleChange}
              />
              
              {settings.defaultPackageType === 'custom' && (
                <div className="mt-2">
                  <SectionTitle>Custom Package Dimensions</SectionTitle>
                  <div className="grid grid-2">
                    <FormInput
                      name="length"
                      label="Length (inches)"
                      type="number"
                      value={settings.length}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      name="width"
                      label="Width (inches)"
                      type="number"
                      value={settings.width}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      name="height"
                      label="Height (inches)"
                      type="number"
                      value={settings.height}
                      onChange={handleChange}
                    />
                    
                    <FormInput
                      name="weight"
                      label="Weight (lbs)"
                      type="number"
                      value={settings.weight}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          <div>
            <Card title="Default Sender Information">
              <FormInput
                name="senderName"
                label="Name"
                placeholder="Your Name"
                value={settings.senderName}
                onChange={handleChange}
              />
              
              <FormInput
                name="senderCompany"
                label="Company (Optional)"
                placeholder="Your Company"
                value={settings.senderCompany}
                onChange={handleChange}
              />
              
              <FormInput
                name="senderStreet1"
                label="Street Address"
                placeholder="123 Main St"
                value={settings.senderStreet1}
                onChange={handleChange}
              />
              
              <FormInput
                name="senderStreet2"
                label="Apartment, Suite, etc. (Optional)"
                placeholder="Suite 100"
                value={settings.senderStreet2}
                onChange={handleChange}
              />
              
              <div className="grid grid-2">
                <FormInput
                  name="senderCity"
                  label="City"
                  placeholder="San Francisco"
                  value={settings.senderCity}
                  onChange={handleChange}
                />
                
                <FormInput
                  name="senderState"
                  label="State"
                  placeholder="CA"
                  value={settings.senderState}
                  onChange={handleChange}
                />
                
                <FormInput
                  name="senderZipCode"
                  label="ZIP Code"
                  placeholder="94107"
                  value={settings.senderZipCode}
                  onChange={handleChange}
                />
                
                <FormSelect
                  name="senderCountry"
                  label="Country"
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'MX', label: 'Mexico' }
                  ]}
                  value={settings.senderCountry}
                  onChange={handleChange}
                />
              </div>
              
              <FormInput
                name="senderPhone"
                label="Phone Number"
                placeholder="(123) 456-7890"
                value={settings.senderPhone}
                onChange={handleChange}
              />
              
              <FormInput
                name="senderEmail"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={settings.senderEmail}
                onChange={handleChange}
              />
            </Card>
            
            <Card title="Options" style={{ marginTop: '2rem' }}>
              <FormCheckbox
                name="saveAddressHistory"
                label="Save address history for quick selection"
                checked={settings.saveAddressHistory}
                onChange={handleChange}
              />
              
              <FormCheckbox
                name="autoValidateAddresses"
                label="Automatically validate addresses when entered"
                checked={settings.autoValidateAddresses}
                onChange={handleChange}
              />
              
              <FormCheckbox
                name="showDeliveryEstimates"
                label="Show delivery time estimates"
                checked={settings.showDeliveryEstimates}
                onChange={handleChange}
              />
              
              <FormCheckbox
                name="emailLabelCopy"
                label="Email a copy of each label after creation"
                checked={settings.emailLabelCopy}
                onChange={handleChange}
              />
            </Card>
          </div>
        </SettingsGrid>
        
        <div className="mt-3 text-right">
          <ButtonGroup>
            <BackButton 
              type="button"
              variant="secondary" 
              onClick={() => navigate('/')}
            >
              <FaArrowLeft />
              Back to Home
            </BackButton>
            
            <Button 
              type="button"
              variant="outline" 
              onClick={handleReset}
            >
              <FaUndo />
              Reset to Defaults
            </Button>
            
            <Button 
              type="submit"
              variant="primary"
            >
              <FaSave />
              Save Settings
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;