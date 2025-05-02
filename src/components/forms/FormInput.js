import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.error ? 'var(--danger-color)' : '#ddd'};
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background-color: ${props => props.disabled ? '#f9f9f9' : 'white'};
  
  &:focus {
    outline: none;
    border-color: ${props => props.error ? 'var(--danger-color)' : 'var(--primary-color)'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(220, 53, 69, 0.1)' : 'rgba(67, 97, 238, 0.1)'};
  }
  
  &::placeholder {
    color: #aaa;
  }
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

const FormInput = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helpText,
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <InputContainer>
      {label && (
        <Label htmlFor={id || name}>
          {label} {required && <span style={{ color: 'var(--danger-color)' }}>*</span>}
        </Label>
      )}
      <Input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputContainer>
  );
};

export default FormInput;