module.exports = {
    purge: {
      enabled: true,
      content: [
        'layouts/**/*.html', 
        'content/**/*.md' 
      ]
    },
    theme: {
        extend: {
          colors: {
            threethrees: '#333'
          },
          margin: {
            '0.5': '0.125rem'
          }
        }
      },
    variants: {},
    darkMode: 'media',
    plugins: []
  }