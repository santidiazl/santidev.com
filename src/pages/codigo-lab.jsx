import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import GlobalStateProvider from '../context/provider';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/sections/hero';
import About from '../components/sections/about';
// import Skills from '../components/sections/skills'
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
        <Projects content={data.tasks.edges} />
        <About content={data.difference.edges} />
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
    index: allMdx(filter: { fileAbsolutePath: { regex: "/codigo-lab/index/" } }) {
      edges {
        node {
          frontmatter {
            seoTitle
          }
        }
      }
    }
    intro: allMdx(filter: { fileAbsolutePath: { regex: "/codigo-lab/1 intro/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            useSocial
            image {
              childImageSharp {
                gatsbyImageData(layout: FULL_WIDTH, quality: 100)
              }
            }
          }
        }
      }
    }
    tasks: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/codigo-lab/2 tasks/" }
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
    difference: allMdx(filter: { fileAbsolutePath: { regex: "/codigo-lab/3 difference/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            imgAlt
            image {
              childImageSharp {
                gatsbyImageData(quality: 100)
              }
            }
          }
        }
      }
    }
    otherProjects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/codigo-lab/4 other-projects/" }
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
