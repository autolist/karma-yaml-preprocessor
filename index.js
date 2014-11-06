var yaml = require('js-yaml');
var path = require('path');
var createYamlPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.yaml');
  var defaultOptions = {
    bare: true,
    sourceMap: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.yaml$/, '.json');
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);

    // Clone the options
    var opts = helper._.clone(options)

    try {
      yaml.safeLoadAll(data, function (result) {
        console.log(result);
        done(null, result);
      });
    } catch (e) {
      log.error('%s\n  at %s:%d', e.message, file.originalPath, e.location.first_line);
      return done(e, null);
    }
    
  };
};

createYamlPreprocessor.$inject = ['args', 'config.yamlPreprocessor', 'logger', 'helper'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:yaml': ['factory', createYamlPreprocessor]
};
