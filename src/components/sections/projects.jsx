import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';
import { motion } from 'framer-motion';

// import { useOnScreen } from '../../hooks'
// import Context from '../../context'
import ContentWrapper from '../../styles/contentWrapper';
// import Underlining from '../../styles/underlining'
import Button from '../../styles/button';
// import Icon from '../../components/icons'

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: 4rem;
  .cta-btn {
    display: block;
    text-align: center;
    margin: 2rem auto;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin: 0 auto;
    }
  }
`;

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0;
    padding-left: 0;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
    }
    .section-title,
    .text-content {
      padding-right: 2.5rem;
      padding-left: 2.5rem;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-right: 0;
        padding-left: 0;
      }
    }
    .projects {
      display: flex;
      flex-direction: row;
      // margin-top: -2.5rem;
      padding: 2.5rem;
      overflow-x: auto;
      overflow-y: hidden;
      // column-gap: 2.5rem;
      -webkit-overflow-scrolling: touch;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        flex-direction: column;
        margin-top: 0;
        padding: 0;
        overflow: visible;
      }
    }
    .counter {
      position: absolute;
      top: 5rem;
      right: 2.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        display: none;
      }
    }
  }
`;

const StyledProject = styled(motion.div)`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
  padding-right: 2.5rem;
  margin-top: 0;
  margin-bottom: 2rem;
  flex-shrink: 0;
  max-width: 20rem;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 2rem;
    max-width: 25rem;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
    flex-shrink: 1;
    max-width: 67.5rem;
    // margin-bottom: 10rem;
    padding-right: 0;
    /* Positioning of image and details should vary */
    flex-direction: ${({ position }) => (position % 2 !== 0 ? 'row' : 'row-reverse')};
  }
  .details {
    width: 100%;
    max-width: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 3rem;
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 0;
      max-width: 25rem;
    }
    p {
      a {
        text-decoration: underline;
      }
    }
    .title {
      color: #000000;
      margin-top: 0.625rem;
      margin-bottom: 0.625rem;
      font-size: 1.375rem;
      line-height: 1.625rem;
      font-weight: 700;
    }
    .links {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin-top: 1rem;
      color: black;
      font-weight: 600;
      a {
        display: inline-block;
        margin-right: 2rem;
      }
      svg {
        width: 1.3rem;
        height: 1.3rem;
        transition: all 0.3s ease-out;
      }
      svg:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .screenshot {
    width: 100%;
    max-width: 20rem;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
    transition: all 0.3s ease-out;
    &:hover {
      transform: translate3d(0px, -0.125rem, 0px);
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
    }
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      max-width: 25rem;
    }
  }
`;

const Projects = ({ content }) => {
  const sectionDetails = content[0].node;
  const projects = content.slice(1, content.length);

  // visibleProject is needed to show which project is currently
  // being viewed in the horizontal slider on mobile and tablet
  const [visibleProject, setVisibleProject] = useState(1);

  // projects don't track the visibility by using the onScreen hook
  // instead they use react-visibility-sensor, therefore their visibility
  // is also stored differently
  const [onScreen, setOnScreen] = useState({});
  const handleOnScreen = (el) => {
    if (!onScreen[el]) {
      const updatedOnScreen = { ...onScreen };
      updatedOnScreen[el] = true;
      setOnScreen(updatedOnScreen);
    }
  };
  const pVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    // mobile and tablet only: set first project as visible in the
    // horizontal slider
    setVisibleProject(1);
    // required for animations: set visibility for all projects to
    // "false" initially
    let initial = {};
    projects.forEach((project) => {
      initial[project.node.frontmatter.position] = false;
    });
    setOnScreen(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Required for animating the title
  // const tRef = useRef()
  // const tOnScreen = useOnScreen(tRef)
  // const tVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 },
  // }

  // Required for animating the button
  // const bRef = useRef()
  // const bOnScreen = useOnScreen(bRef)
  // const bVariants = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1 },
  // }

  return (
    <StyledSection id="projects">
      <StyledContentWrapper>
        <motion.div
        // ref={tRef}
        // variants={tVariants}
        // animate={tOnScreen ? 'visible' : 'hidden'}
        >
          <h3 className="section-title">{sectionDetails.frontmatter.title}</h3>
          <div className="text-content">
            {sectionDetails.body && <MDXRenderer>{sectionDetails.body}</MDXRenderer>}
          </div>
          <div className="counter">
            {visibleProject} / {projects.length}
            {visibleProject !== projects.length ? ' >>' : ''}
          </div>
        </motion.div>
        <div className="projects">
          {projects.map((project, key) => {
            const { body, frontmatter } = project.node;
            return (
              <VisibilitySensor
                key={key}
                onChange={() => handleOnScreen(key + 1)}
                partialVisibility={true}
                minTopValue={100}
              >
                <StyledProject
                  position={key + 1}
                  variants={pVariants}
                  animate={onScreen[frontmatter.position] ? 'visible' : 'hidden'}
                >
                  <div className="details">
                    <div className="title">{frontmatter.title}</div>
                    {body && <MDXRenderer>{body}</MDXRenderer>}
                    <div className="links">
                      {frontmatter.internal && (
                        <Link to={frontmatter.internal}>{frontmatter.view}</Link>
                      )}
                      {frontmatter.external && (
                        <a href={frontmatter.external} rel="noreferrer" target="_blank">
                          {frontmatter.view}
                        </a>
                      )}
                    </div>
                  </div>
                  {/* If image in viewport changes, update state accordingly */}
                  <VisibilitySensor onChange={() => setVisibleProject(frontmatter.position)}>
                    <GatsbyImage className="screenshot" image={getImage(frontmatter.screenshot)} />
                  </VisibilitySensor>
                </StyledProject>
              </VisibilitySensor>
            );
          })}
        </div>
      </StyledContentWrapper>
      {sectionDetails.frontmatter.buttonVisible && (
        <motion.a
          // ref={bRef}
          // variants={bVariants}
          // animate={bOnScreen ? 'visible' : 'hidden'}
          className="cta-btn"
          href={sectionDetails.frontmatter.buttonUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="External Link"
        >
          <Button type="button" textAlign="center" center>
            {sectionDetails.frontmatter.buttonText}
          </Button>
        </motion.a>
      )}
    </StyledSection>
  );
};

Projects.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default Projects;
