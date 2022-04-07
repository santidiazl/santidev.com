import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import GlobalStateProvider from '../context/provider';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/sections/hero';
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
        <Hero content={data.intro.edges} />
        <Skills content={data.techStack.edges} />
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
    intro: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/1 intro/" } }) {
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
    techStack: allMdx(filter: { fileAbsolutePath: { regex: "/chat-app/2 tech-stack/" } }) {
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
    otherProjects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/chat-app/3 other-projects/" }
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
