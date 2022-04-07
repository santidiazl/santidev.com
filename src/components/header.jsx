import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import ContentWrapper from '../styles/contentWrapper';
import Logo from './logo';
import { navLinks } from '../../config';

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
  .cta-btn {
    width: auto;
    height: auto;
    font-weight: 700;
    color: black;
    border-radius: ${({ theme }) => theme.borderRadius};
    border: 0.125rem solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
    transition: 20ms ease-out;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    margin: 0;
    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.background};
    }
  }
`;
const Header = () => {
  const { button } = navLinks;
  return (
    <StyledHeader>
      <StyledContentWrapper>
        <Link to="/" aria-label="home">
          <Logo size="1.5rem" color="black" />
        </Link>
        {button.useFileName ? (
          <a
            className="cta-btn"
            href={`/${button.fileName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {button.name}
          </a>
        ) : (
          <Link className="cta-btn" to={button.url}>
            {button.name}
          </Link>
        )}
      </StyledContentWrapper>
    </StyledHeader>
  );
};

export default Header;
