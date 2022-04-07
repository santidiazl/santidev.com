import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import ContentWrapper from '../styles/contentWrapper';
import Logo from './logo';
import { footerLinks, navLinks } from '../../config';

const StyledFooter = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background: ${({ theme }) => theme.colors.primary};
  margin-top: 4rem;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-links {
      /* Adjust width of links wrapper accordingly */
      width: 10rem;
      display: flex;
      justify-content: center;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 15rem;
      }
    }
    svg {
      fill: white;
    }
    .cta-btn {
      width: auto;
      height: auto;
      font-weight: 700;
      color: white;
      border-radius: ${({ theme }) => theme.borderRadius};
      border: 0.125rem solid ${({ theme }) => theme.colors.primary};
      background: black;
      transition: 20ms ease-out;
      font-size: 1rem;
      padding: 0.5rem 1.5rem;
      margin: 0;
      &:hover {
        background: white;
        color: black;
      }
    }
  }
`;

const StyledLink = styled.a`
  font-size: 0.6rem;
  color: ${({ theme }) => theme.colors.background};
  letter-spacing: 1px;
  text-align: center;
`;

const Footer = () => (
  <StyledFooter>
    <StyledContentWrapper>
      <Link to="/" aria-label="home">
        <Logo size="1.5rem" color="white" />
      </Link>
      <div className="footer-links" data-testid="footer-links">
        {footerLinks.map(({ name, url }) => (
          <StyledLink key={name} href={url} target="_blank" rel="noreferrer">
            {name}
          </StyledLink>
        ))}
      </div>
    </StyledContentWrapper>
  </StyledFooter>
);
export default Footer;
