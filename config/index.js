module.exports = {
  // -- SITE SETTINGS -----
  author: '@santidiazl',
  siteTitle: 'Santi Diaz | React/Node Full Stack Developer',
  siteShortTitle: 'Santi Diaz', // Used as logo text in header, footer, and splash screen
  siteDescription:
    'Website showcasing some of my Full Stack JavaScript work: Front End projects using React and Back End projects using Node/Express.',
  siteUrl: 'https://www.santidev.com',
  siteLanguage: 'en_US',
  siteIcon: 'content/favicon.png', // Relative to gatsby-config file
  seoTitleSuffix: '', // SEO title syntax will be e.g. "Imprint - {seoTitleSuffix}"

  // -- THEME SETTINGS -----
  colors: {
    lightTheme: {
      primary: '#000000',
      secondary: '#FFF4D9',
      tertiary: '#F2F2F2',
      header: '#000000',
      text: 'rgb(105, 105, 105)',
      subtext: '#696969',
      background: '#FFFFFF',
      card: '#FFFFFF',
      scrollBar: 'rgba(0, 0, 0, 0.5)',
      boxShadow: 'rgba(0, 0, 0, 0.16)',
      boxShadowHover: 'rgba(0, 0, 0, 0.32)',
    },
  },
  fonts: {
    primary: 'Noto Sans Display, sans-serif',
  },

  // -- ARTICLES SECTION SETTINGS -----
  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  // mediumRssFeed:
  //   "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40konstantinmuenster",
  // // rssFeed: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Finternational%2Frss",

  shownArticles: 3,

  // -- SOCIAL MEDIA SETTINGS -----
  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance, E-Mail
  socialMedia: [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/santi-diaz/',
    },
    // {
    //   name: "Medium",
    //   url: "https://konstantinmuenster.medium.com/",
    // },
    {
      name: 'Github',
      url: 'https://github.com/santidiazl',
    },
  ],

  // -- NAVIGATION SETTINGS -----
  navLinks: {
    menu: [
      {
        name: 'About Me',
        url: '/#about',
      },
      {
        name: 'Projects',
        url: '/#projects',
      },
      {
        name: 'Contact',
        url: '/#contact',
      },
    ],
    button: {
      useFileName: true,
      name: 'CV',
      fileName: 'Santiago_Diaz_CV.pdf', // the file has to be placed inside the static folder at the root level
      url: '', // if useFileName=false, you can set an anchor link here and use the button for navigational purposes
    },
  },
  footerLinks: [
    {
      name: 'Design: Gatsby starter by Konstantin Muenster, © 2021',
      url: 'https://github.com/konstantinmuenster/gatsby-starter-portfolio-minimal',
    },
    // {
    //   name: "Imprint",
    //   url: "/imprint",
    // },
  ],
};
