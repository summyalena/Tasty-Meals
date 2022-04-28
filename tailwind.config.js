module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation:{
          meals: 'meals-appear 1s ease-out forwards'
        }
      },
    },
    variants:{
      backgroundColor:['responsive','hover','focus','active']
    },
    // plugins: [],
  }