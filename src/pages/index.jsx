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
import Contact from '../components/sections/contact';
import { seoTitleSuffix } from '../../config';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.index.edges[0].node;
  const { seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter;

  const globalState = {
    isIntroDone: !useSplashScreen,
    darkMode: false,
  };

  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO title={useSeoTitleSuffix ? `${seoTitle} - ${seoTitleSuffix}` : `${seoTitle}`} />
        <Hero content={data.hero.edges} />
        <About content={data.about.edges} />
        <Skills content={data.skills.edges} />
        <Projects content={data.projects.edges} />
        <Contact content={data.contact.edges} />
      </Layout>
    </GlobalStateProvider>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    index: allMdx(filter: { fileAbsolutePath: { regex: "/index/index/" } }) {
      edges {
        node {
          frontmatter {
            seoTitle
            useSeoTitleSuffix
            useSplashScreen
          }
        }
      }
    }
    hero: allMdx(filter: { fileAbsolutePath: { regex: "/index/1 hero/" } }) {
      edges {
        node {
          body
          frontmatter {
            greetings
            subtitle
            underlineOne
            subtitleTwo
            underlineTwo
            subtitleThree
            useSocial
          }
        }
      }
    }
    about: allMdx(filter: { fileAbsolutePath: { regex: "/index/2 about/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
          }
        }
      }
    }
    skills: allMdx(filter: { fileAbsolutePath: { regex: "/index/3 skills/" } }) {
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
    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/index/4 projects/" }
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
                gatsbyImageData(quality: 90)
              }
            }
            position
            buttonVisible
            buttonUrl
            buttonText
          }
        }
      }
    }
    contact: allMdx(filter: { fileAbsolutePath: { regex: "/index/5 contact/" } }) {
      edges {
        node {
          body
          frontmatter {
            title
            name
            email
            profileImage {
              childImageSharp {
                gatsbyImageData(quality: 90)
              }
            }
          }
        }
      }
    }
  }
`;
