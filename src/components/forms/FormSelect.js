import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const SelectContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? 'var(--danger-color)' : '#ddd'};
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background-color: ${props => props.disabled ? '#f9f9f9' : 'white'};
  appearance: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'var(--danger-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(67, 97, 238, 0.1)'};
  }
`;

const ChevronIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-light);
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const HelpText = styled.div`
  color: var(--text-light);
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const FormSelect = ({
  id,
  name,
  label,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  helpText,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  ...props
}) => {
  return (
    <SelectContainer>
      {label && (
        <Label htmlFor={id || name}>
          {label} {required && <span style={{ color: 'var(--danger-color)' }}>*</span>}
        </Label>
      )}
      <SelectWrapper>
        <Select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          disabled={disabled}
          required={required}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronIcon>
          <FaChevronDown />
        </ChevronIcon>
      </SelectWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </SelectContainer>
  );
};

export default FormSelect;