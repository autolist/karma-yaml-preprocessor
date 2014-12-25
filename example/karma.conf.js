module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      '*.js',
      {pattern: '*.yaml', included: true, served: true},
    ],
    preprocessors: {
      '*.yaml': ['yaml']
    },
    browsers: ['Firefox'],
    yamlPreprocessor:{
      options:{}
    },
    plugins: [
      "karma-yaml-preprocessor",
      'karma-*'
    ],
    reporters: ['dots']
  });
};
