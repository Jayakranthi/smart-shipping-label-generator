import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: ${props => props.padding || '1.5rem'};
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
  border: ${props => props.border || 'none'};
  transition: var(--transition);
  
  &:hover {
    box-shadow: ${props => props.hoverable ? '0 8px 16px rgba(0, 0, 0, 0.1)' : 'var(--box-shadow)'};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: ${props => props.divider ? '1rem' : '0'};
  border-bottom: ${props => props.divider ? '1px solid #eee' : 'none'};
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-color);
`;

const CardBody = styled.div`
  margin-bottom: ${props => props.actions ? '1rem' : '0'};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: ${props => props.align || 'flex-end'};
  padding-top: ${props => props.divider ? '1rem' : '0'};
  border-top: ${props => props.divider ? '1px solid #eee' : 'none'};
  gap: 0.5rem;
`;

const Card = ({ 
  children, 
  title, 
  headerRight,
  actions,
  hoverable = false,
  padding,
  marginBottom,
  border,
  headerDivider = false,
  footerDivider = false,
  footerAlign = 'flex-end'
}) => {
  return (
    <CardContainer 
      hoverable={hoverable}
      padding={padding}
      marginBottom={marginBottom}
      border={border}
    >
      {(title || headerRight) && (
        <CardHeader divider={headerDivider}>
          {title && <CardTitle>{title}</CardTitle>}
          {headerRight && headerRight}
        </CardHeader>
      )}
      <CardBody actions={actions}>
        {children}
      </CardBody>
      {actions && (
        <CardFooter divider={footerDivider} align={footerAlign}>
          {actions}
        </CardFooter>
      )}
    </CardContainer>
  );
};

export default Card;