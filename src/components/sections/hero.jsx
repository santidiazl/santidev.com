import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';

import Context from '../../context';
import ContentWrapper from '../../styles/contentWrapper';
import Underlining from '../../styles/underlining';
import Social from '../social';
import { lightTheme } from '../../styles/theme';

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 6rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-bottom: 4rem;
    }
    .greetings {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .image {
      width: 100%;
      margin-top: 1rem;
      margin-left: 0;
      border-radius: ${({ theme }) => theme.borderRadius};
    }
    .title {
      margin-bottom: 1.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-bottom: 0;
      }
    }
    .subtitle {
      margin-top: -0.1rem;
    }
    .description {
      font-size: 1rem;
      margin-bottom: 2rem;
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
    svg:hover {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const AnimatedUnderlining = motion(Underlining, {
  forwardMotionProps: true,
});

const Hero = ({ content }) => {
  const { frontmatter, body } = content[0].node;
  const { isIntroDone, darkMode } = useContext(Context).state;
  const image = getImage(frontmatter.image);
  // Controls to orchestrate animations of greetings, emoji, social profiles, underlining
  const gControls = useAnimation();
  const sControls = useAnimation();
  const uControls = useAnimation();

  // Start Animations after the splashScreen sequence is done
  useEffect(() => {
    const pageLoadSequence = async () => {
      if (isIntroDone) {
        await gControls.start({
          opacity: 1,
          y: 0,
          transition: { delay: 0.4 },
        });
        await sControls.start({
          opacity: 1,
          x: 0,
        });
        // Animate underlining to hover state
        await uControls.start({
          boxShadow: `inset 0 -2rem 0 ${lightTheme.colors.secondary}`,
          transition: { delay: 0.4, ease: 'circOut' },
        });
      }
    };
    pageLoadSequence();
  }, [isIntroDone, darkMode, gControls, sControls, uControls]);

  return (
    <StyledSection id="hero">
      <StyledContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={gControls}
          data-testid="animated-heading"
        >
          <h1 className="title">
            <div className="greetings">{frontmatter.greetings}</div>
          </h1>
          <h2 className="subtitle">
            {frontmatter.subtitle}
            <AnimatedUnderlining animate={uControls} big>
              {frontmatter.underlineOne}
            </AnimatedUnderlining>
            {frontmatter.subtitleTwo}
            <AnimatedUnderlining animate={uControls} big>
              {frontmatter.underlineTwo}
            </AnimatedUnderlining>
            {frontmatter.subtitleThree}
          </h2>
          <div className="description">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={sControls}>
          {frontmatter.useSocial && (
            <Social fontSize=".95rem" padding=".3rem 1.25rem" width="auto" withIcon />
          )}
        </motion.div>
        {frontmatter.image && (
          <GatsbyImage className="image" alt={frontmatter.imgAlt} image={image} />
        )}
      </StyledContentWrapper>
    </StyledSection>
  );
};

Hero.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.shape,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Hero;
