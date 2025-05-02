import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import Button from '../common/Button';
import Alert from '../common/Alert';
import Card from '../common/Card';
import { FaSync, FaCheck, FaExclamationTriangle } from 'react-icons/fa';

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const AddressValidationResult = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.isValid ? 'rgba(46, 204, 113, 0.1)' : 'rgba(243, 156, 18, 0.1)'};
  border-left: 4px solid ${props => props.isValid ? 'var(--success-color)' : 'var(--warning-color)'};
  margin-bottom: 1.5rem;
`;

const ValidationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: 600;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const AddressComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AddressColumn = styled.div`
  h4 {
    font-size: 0.9rem;
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
  }
  
  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

// Validation schema
const addressSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  company: Yup.string(),
  street1: Yup.string().required('Street address is required'),
  street2: Yup.string(),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string()
    .required('ZIP code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
  country: Yup.string().required('Country is required'),
  phone: Yup.string()
    .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Invalid phone number format')
    .required('Phone number is required'),
  email: Yup.string().email('Invalid email format').required('Email is required')
});

// Mock function for address validation (in a real app, this would call the Google Address Validation API)
const validateAddress = async (address) => {
  // Simulate API call to Google Address Validation API
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, let's assume the address needs correction
      const suggestedAddress = {
        ...address,
        street1: address.street1.toUpperCase(),
        city: address.city.toUpperCase(),
        state: address.state.toUpperCase(),
        zipCode: address.zipCode.replace(/(\d{5})/, '$1-0000')
      };
      
      resolve({
        isValid: true,
        suggestedAddress,
        message: 'Address has been standardized using Google Address Validation API'
      });
    }, 1000);
  });
};

const US_STATES = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' }
];

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'MX', label: 'Mexico' }
];

const AddressForm = ({ onSubmit, initialValues }) => {
  const [validationResult, setValidationResult] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);
  
  const defaultValues = {
    name: '',
    company: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    email: ''
  };
  
  const handleValidateAddress = async (values) => {
    setIsValidating(true);
    setError(null);
    
    try {
      const result = await validateAddress(values);
      setValidationResult(result);
    } catch (err) {
      setError('Failed to validate address. Please try again.');
      console.error(err);
    } finally {
      setIsValidating(false);
    }
  };
  
  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(validationResult?.suggestedAddress || values);
    }
  };
  
  const handleAcceptSuggested = (setValues) => {
    if (validationResult?.suggestedAddress) {
      setValues(validationResult.suggestedAddress);
    }
  };
  
  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={addressSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, setValues }) => (
        <Form>
          {error && (
            <Alert 
              type="danger" 
              message={error} 
              dismissible 
              onClose={() => setError(null)} 
            />
          )}
          
          <Card title="Recipient Information">
            <FormGrid>
              <FormInput
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
                required
              />
              
              <FormInput
                name="company"
                label="Company (Optional)"
                placeholder="Company Name"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.company && errors.company}
              />
              
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="email@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                required
              />
              
              <FormInput
                name="phone"
                label="Phone Number"
                placeholder="(123) 456-7890"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && errors.phone}
                required
              />
            </FormGrid>
          </Card>
          
          <Card title="Shipping Address">
            <FormGrid>
              <FullWidthField>
                <FormInput
                  name="street1"
                  label="Street Address"
                  placeholder="123 Main St"
                  value={values.street1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street1 && errors.street1}
                  required
                />
              </FullWidthField>
              
              <FullWidthField>
                <FormInput
                  name="street2"
                  label="Apartment, Suite, etc. (Optional)"
                  placeholder="Apt 4B"
                  value={values.street2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.street2 && errors.street2}
                />
              </FullWidthField>
              
              <FormInput
                name="city"
                label="City"
                placeholder="New York"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.city && errors.city}
                required
              />
              
              <FormSelect
                name="state"
                label="State"
                options={US_STATES}
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.state && errors.state}
                required
              />
              
              <FormInput
                name="zipCode"
                label="ZIP Code"
                placeholder="12345"
                value={values.zipCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.zipCode && errors.zipCode}
                required
              />
              
              <FormSelect
                name="country"
                label="Country"
                options={COUNTRIES}
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.country && errors.country}
                required
              />
            </FormGrid>
            
            <div className="mt-3">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => handleValidateAddress(values)}
                disabled={isValidating || Object.keys(errors).length > 0}
              >
                {isValidating ? <FaSync /> : <FaCheck />}
                {isValidating ? 'Validating...' : 'Validate Address'}
              </Button>
            </div>
          </Card>
          
          {validationResult && (
            <AddressValidationResult isValid={validationResult.isValid}>
              <ValidationHeader>
                {validationResult.isValid ? (
                  <>
                    <FaCheck color="var(--success-color)" />
                    <span>Address Validated</span>
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle color="var(--warning-color)" />
                    <span>Address Needs Correction</span>
                  </>
                )}
              </ValidationHeader>
              
              <p>{validationResult.message}</p>
              
              {validationResult.suggestedAddress && (
                <>
                  <AddressComparison>
                    <AddressColumn>
                      <h4>Original Address</h4>
                      <p>
                        {values.street1}<br />
                        {values.street2 && `${values.street2}<br />`}
                        {values.city}, {values.state} {values.zipCode}<br />
                        {COUNTRIES.find(c => c.value === values.country)?.label}
                      </p>
                    </AddressColumn>
                    
                    <AddressColumn>
                      <h4>Suggested Address</h4>
                      <p>
                        {validationResult.suggestedAddress.street1}<br />
                        {validationResult.suggestedAddress.street2 && `${validationResult.suggestedAddress.street2}<br />`}
                        {validationResult.suggestedAddress.city}, {validationResult.suggestedAddress.state} {validationResult.suggestedAddress.zipCode}<br />
                        {COUNTRIES.find(c => c.value === validationResult.suggestedAddress.country)?.label}
                      </p>
                    </AddressColumn>
                  </AddressComparison>
                  
                  <div className="mt-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => handleAcceptSuggested(setValues)}
                    >
                      Use Suggested Address
                    </Button>
                  </div>
                </>
              )}
            </AddressValidationResult>
          )}
          
          <div className="text-right mt-3">
            <Button 
              type="submit" 
              variant="primary"
              disabled={Object.keys(errors).length > 0 || !validationResult}
            >
              Continue to Shipping Options
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;