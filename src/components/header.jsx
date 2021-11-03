import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import ContentWrapper from '../styles/contentWrapper';
import Logo from './logo';

const StyledHeader = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const Header = () => (
  <StyledHeader>
    <StyledContentWrapper>
      <Link to="/" aria-label="home">
        <Logo size="1.5rem" color="black" />
      </Link>
    </StyledContentWrapper>
  </StyledHeader>
);

export default Header;
