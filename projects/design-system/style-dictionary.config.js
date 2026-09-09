module.exports = {
  source: ['tokens/*.tokens.json'],
  platforms: {
    primitives: {
      transformGroup: 'css',
      prefix: 'ds-primitive',
      buildPath: 'src/lib/styles/',
      files: [
        {
          destination: 'primitives.css',
          format: 'css/variables',
          filter: (token) =>
            token.filePath.endsWith('primitives.tokens.json') && token.path[0] === 'color',
        },
      ],
    },
    semantic: {
      transformGroup: 'css',
      prefix: 'ds',
      buildPath: 'src/lib/styles/',
      files: [
        {
          destination: 'semantic.css',
          format: 'css/variables',
          filter: (token) =>
            token.filePath.endsWith('semantic.tokens.json') ||
            (token.filePath.endsWith('primitives.tokens.json') && token.path[0] !== 'color'),
        },
      ],
    },
  },
};