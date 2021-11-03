const {
  author,
  siteTitle,
  siteShortTitle,
  siteDescription,
  siteIcon,
  siteUrl,
  colors,
} = require('./config');

module.exports = {
  siteMetadata: {
    author,
    title: siteTitle,
    description: siteDescription,
    siteUrl,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteTitle,
        short_name: siteShortTitle,
        start_url: '/',
        background_color: colors.lightTheme.background,
        theme_color: colors.lightTheme.primary,
        display: 'minimal-ui',
        icon: siteIcon, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: ['G-LJ4JTYZW8B'],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1000,
              quality: 80,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
  ],
};
