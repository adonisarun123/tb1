export default {
  plugins: {
    'tailwindcss': {},
    'autoprefixer': {},
    
    // Basic CSS optimization for production
    ...(process.env.NODE_ENV === 'production' && {
      'cssnano': {
        preset: ['default', {
          // Safe optimizations
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifySelectors: true,
          mergeRules: true,
          
          // Conservative settings to avoid breaking styles
          autoprefixer: false, // We handle this separately
          reduceIdents: false,
          discardUnused: false, // Too aggressive for complex apps
        }]
      }
    })
  },
}
