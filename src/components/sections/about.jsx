import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
// import { motion, useAnimation } from 'framer-motion'

// import { useOnScreen } from '../../hooks/'
// import Context from '../../context/'
import ContentWrapper from '../../styles/contentWrapper';

const StyledSection = styled.section`
  /* width: 100%; */
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    // display: flex;
    // flex-direction: column;
    /* justify-content: space-between;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: row;
      justify-content: space-between;
    } */
    /* .section-title {
      margin-bottom: 2rem;
    }
    .inner-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-content {
      // width: 100%;
      a {
        text-decoration: underline;
      }
    } */
    .image {
      margin-top: 3rem;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    /* .about-author {
      border-radius: ${({ theme }) => theme.borderRadius};
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      filter: grayscale(20%) contrast(1) brightness(90%);
      transition: all 0.3s ease-out;
      &:hover {
        filter: grayscale(50%) contrast(1) brightness(90%);
        transform: translate3d(0px, -0.125rem, 0px);
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
      }
    } */
    a {
      display: inline-block;
      margin-top: 2rem;
      color: black;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const About = ({ content }) => {
  const { frontmatter, body } = content[0].node;
  const image = getImage(frontmatter.image);

  return (
    <StyledSection id="about">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <div className="text-content">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
        {frontmatter.image && (
          <GatsbyImage className="image" alt={frontmatter.imgAlt} image={image} />
        )}
      </StyledContentWrapper>
    </StyledSection>
  );
};

About.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default About;
