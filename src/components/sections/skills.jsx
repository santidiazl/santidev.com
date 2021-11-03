import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { motion, useAnimation } from 'framer-motion';

import { detectMobileAndTablet, isSSR } from '../../utils';
import useOnScreen from '../../hooks/useOnScreen';
import ContentWrapper from '../../styles/contentWrapper';
import Button from '../../styles/button';

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
  }
`;

const StyledSkills = styled.div`
  display: grid;
  /* Calculate how many columns are needed, depending on interests count */
  grid-template-columns: repeat(${({ itemCount }) => Math.ceil(itemCount / 2)}, 13.75rem);
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  column-gap: 2.5rem;
  row-gap: 1rem;
  padding: 0 2.5rem 1.25rem 2.5rem;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  /* Workaround: https://stackoverflow.com/questions/38993170/last-margin-padding-collapsing-in-flexbox-grid-layout */
  &::after {
    content: '';
    width: ${({ itemCount }) => (Math.ceil(itemCount / 2) % 2 === 1 ? '17.125rem' : '2.5rem')};
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-flow: row;
    grid-template-columns: repeat(4, 13.75rem);
    overflow: visible;
    padding: 0;
  }
  /* Show scrollbar if desktop and wrapper width > viewport width */
  @media (hover: hover) {
    scrollbar-color: ${({ theme }) => theme.colors.scrollBar} transparent; // Firefox only
    &::-webkit-scrollbar {
      display: block;
      -webkit-appearance: none;
    }

    &::-webkit-scrollbar:horizontal {
      height: 0.8rem;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border: 0.2rem solid ${({ theme }) => theme.colors.background};
      background-color: ${({ theme }) => theme.colors.scrollBar};
    }

    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.colors.background};
      border-radius: 8px;
    }
  }

  .interest {
    width: 15rem;
    height: 3rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    color: #000000;
    background: ${({ theme }) => theme.colors.heading};
    .icon {
      margin-right: 0.5rem;
    }
  }
`;

const Skills = ({ content }) => {
  const { exports, frontmatter } = content[0].node;
  const { shownItems, skills } = exports;

  const [shownInterests, setShownInterests] = useState(shownItems);

  const ref = useRef();
  const onScreen = useOnScreen(ref);

  const iControls = useAnimation();
  const bControls = useAnimation();

  useEffect(() => {
    // If mobile or tablet, show all interests initially
    // Otherwise interests.mdx will determine how many interests are shown
    // (isSSR) is used to prevent error during gatsby build
    if (!isSSR && detectMobileAndTablet(window.innerWidth)) {
      setShownInterests(skills.length);
    }
  }, [skills]);

  useEffect(() => {
    const sequence = async () => {
      if (onScreen) {
        // i receives the value of the custom prop - can be used to stagger
        // the animation of each "interest" element
        await iControls.start((i) => ({
          opacity: 1,
          scaleY: 1,
          transition: { delay: i * 0.1 },
        }));
        await bControls.start({ opacity: 1, scaleY: 1 });
      }
    };
    sequence();
  }, [onScreen, shownInterests, iControls, bControls]);

  const showMoreItems = () => setShownInterests(shownInterests + 4);

  return (
    <StyledSection id="interests">
      <StyledContentWrapper>
        <h3 className="section-title">{frontmatter.title}</h3>
        <StyledSkills itemCount={skills.length} ref={ref}>
          {skills.slice(0, shownInterests).map(({ name, icon }, key) => (
            <div
              className="interest"
              key={name}
              custom={key}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={iControls}
            >
              <GatsbyImage className="icon" image={getImage(icon)} />
              {name}
            </div>
          ))}
          {shownInterests < skills.length && (
            <motion.div initial={{ opacity: 0, scaleY: 0 }} animate={bControls}>
              <Button onClick={() => showMoreItems()} type="button" textAlign="left">
                + Load more
              </Button>
            </motion.div>
          )}
        </StyledSkills>
      </StyledContentWrapper>
    </StyledSection>
  );
};

Skills.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        exports: PropTypes.shape({
          skills: PropTypes.arrayOf.isRequired,
          shownItems: PropTypes.number.isRequired,
        }).isRequired,
        frontmatter: PropTypes.shape.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Skills;
