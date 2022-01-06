import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import GlobalStateProvider from '../context/provider';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/sections/hero';
import About from '../components/sections/about';
import Skills from '../components/sections/skills';
import Projects from '../components/sections/projects';

const ProjectPage = ({ data }) => {
  const { frontmatter } = data.index.edges[0].node;
  const { seoTitle } = frontmatter;
  const globalState = {
    isIntroDone: true,
    darkMode: false,
  };
  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO title={seoTitle} />
        <Hero content={data.hero.edges} />
        <Skills content={data.techStack.edges} />
        <About content={data.purpose.edges} />
        <Projects content={data.spotlight.edges} />
        <About content={data.currentStatus.edges} />
        <About content={data.lessonsLearned.edges} />
        <Projects content={data.otherProjects.edges} />
      </Layout>
    </GlobalStateProvider>
  );
};

ProjectPage.propTypes = {
  data: PropTypes.shape,
};

export default ProjectPage;

export const pageQuery = graphql`
  {
    index: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/index/" } }) {
      edges {
        node {
          frontmatter {
            seoTitle
          }
        }
      }
    }
    hero: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/hero/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            imgAlt
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, quality: 100)
              }
            }
          }
        }
      }
    }
    techStack: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/tech-stack/" } }) {
      edges {
        node {
          exports {
            shownItems
            skills {
              name
              icon {
                childImageSharp {
                  gatsbyImageData(width: 20, height: 20, quality: 90, layout: FIXED)
                }
              }
            }
          }
          frontmatter {
            title
          }
        }
      }
    }
    purpose: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/chat-app/purpose/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
          }
        }
      }
    }
    currentStatus: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/chat-app/current-status/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
          }
        }
      }
    }
    spotlight: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/chat-app/spotlight/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            external
            view
            screenshot {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            position
            buttonVisible
          }
        }
      }
    }
    lessonsLearned: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/lessons-learned/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
          }
        }
      }
    }
    otherProjects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/chat-app/other-projects/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          frontmatter {
            title
            internal
            view
            screenshot {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
            position
            buttonVisible
          }
        }
      }
    }
  }
`;
