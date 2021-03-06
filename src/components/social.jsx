import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import Context from '../context';
import Icon from './icons';
import { lightTheme } from '../styles/theme';
import { socialMedia } from '../../config';

const StyledSocialWrapper = styled.div`
  display: flex;

  margin-left: -2.5rem;
  margin-right: -2.5rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;

  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    overflow: visible;
  }

  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  /* &::after {
    content: '';
    width: 2.5rem;
  } */

  a {
    margin-right: 0.5rem;
    margin-bottom: 0.75rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-right: 1rem;
    }
  }
`;

const StyledSocialProfile = styled.a`
  width: ${({ width }) => width || 'auto'};
  height: auto;
  /* background: ${({ theme }) => theme.colors.background};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary} 50%,
    ${({ theme }) => theme.colors.background} 50%
  );
  background-size: 205% 100%;
  background-position: right bottom; */
  //border-radius: ${({ theme }) => theme.borderRadius};
  // border: 0.125rem solid ${({ theme }) => theme.colors.primary};
  // padding: ${({ padding }) => padding || '.3rem 1.25rem'};
  transition: all 0.1s ease-out;
  font-size: ${({ fontSize }) => fontSize || '1rem'};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  &:hover {
    background-position: left bottom;
    color: ${({ theme }) => theme.colors.background};
  }
  /* &:hover svg {
    filter: invert(1);
  } */
  svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
    margin-bottom: -0.05rem;
  }
`;

const Social = ({ width, padding, fontSize, fontWeight, withIcon }) => (
  <StyledSocialWrapper itemCount={socialMedia.length}>
    {socialMedia.map(({ name, url }) => (
      <StyledSocialProfile
        key={name}
        href={url}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label={name}
        width={width}
        padding={padding}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {withIcon ? <Icon name={name} color={lightTheme.colors.text} /> : null}
      </StyledSocialProfile>
    ))}
  </StyledSocialWrapper>
);

Social.propTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  withIcon: PropTypes.bool,
};

export default Social;
