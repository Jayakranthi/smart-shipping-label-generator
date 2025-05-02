import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  margin-bottom: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: ${props => props.checked ? 'var(--primary-color)' : 'white'};
  border: 1px solid ${props => props.checked ? 'var(--primary-color)' : props.error ? 'var(--danger-color)' : '#ddd'};
  border-radius: 4px;
  transition: all 0.2s;
  margin-right: 0.5rem;
  
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
  }
  
  ${HiddenCheckbox}:disabled + & {
    background-color: #f9f9f9;
    border-color: #ddd;
  }
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  visibility: ${props => props.checked ? 'visible' : 'hidden'};
`;

const LabelText = styled.span`
  font-size: 0.95rem;
  color: var(--text-color);
`;

const ErrorMessage = styled.div`
  color: var(--danger-color);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 1.75rem;
`;

const HelpText = styled.div`
  color: var(--text-light);
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-left: 1.75rem;
`;

const FormCheckbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  onBlur,
  error,
  helpText,
  disabled = false,
  ...props
}) => {
  return (
    <CheckboxContainer>
      <CheckboxLabel htmlFor={id || name}>
        <HiddenCheckbox
          id={id || name}
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          {...props}
        />
        <StyledCheckbox checked={checked} error={error} disabled={disabled}>
          <CheckIcon viewBox="0 0 24 24" checked={checked}>
            <polyline points="20 6 9 17 4 12" />
          </CheckIcon>
        </StyledCheckbox>
        <LabelText>{label}</LabelText>
      </CheckboxLabel>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </CheckboxContainer>
  );
};

export default FormCheckbox;