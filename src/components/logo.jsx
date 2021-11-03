import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLogo = styled.div`
  position: relative;
  z-index: 13;

  font-size: ${({ size }) => size || '1.75rem'};
  font-weight: 200;
  color: ${({ color }) => color};

  /* Disable effects when sidebar is open */
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
`;

const Logo = ({ size, color }) => (
  <StyledLogo color={color} size={size}>
    Santi
    <br />
    Diaz
  </StyledLogo>
);

Logo.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Logo;
