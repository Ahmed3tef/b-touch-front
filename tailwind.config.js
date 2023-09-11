module.exports = {
  content: [
    './src/components/**/*.jsx',
    './src/pages/**/*.jsx',
    './src/**/*.jsx',
    './src/index.html'
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px'
    },
    fontSize: {
      base: '1.6rem'
    },
    extend: {
      colors: {

        //MAIN
        mainGrey: '#3B3B3B',
        mainGreyDarker: '#231F20',
        mainGreyLightest: '#F1F1F1',
        brandBg: '#d9d9d9',
        date: '#181663',
        darkGreen: '#0f3d3e',
        progressGray: 'rgba(35, 31, 32, 0.15)',
        badgeBg: 'rgba(35, 31, 32, 0.5)',
        badgeText: 'rgba(255, 255, 255, 0.7)',
        sidebarBg: '#F5F5F5',
        staticBlue: '#2A5F9E',
        lightGreen: '#207D66',
        btnRed: '#BF2129',

        //TEXT PAGES
        'color-alt': '#30AFE0',
        'footer-mini': '#22292E',
        'text-dark': '#464B4E',
        "p-lighter": '#4C4C4C'
        
      },
      fontFamily: {
        Orelega:['Orelega One','cursive'],
        Roboto: ['Roboto', 'sans'],
        Playball: ['Playball', 'sans']
      }
    }
  },
  plugins: []
};
