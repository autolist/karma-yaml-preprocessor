var yaml = require('js-yaml');
var path = require('path');

var createYamlPreprocessor = function(args, config, logger, helper, basePath) {
  config = config || {};

  var log = logger.create('preprocessor.yaml');
  var defaultOptions = {
    bare: true,
    sourceMap: false
  };
  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath = args.transformPath || config.transformPath || function(filepath) {
    return filepath.replace(/\.yml$/, '.json');
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);

    // Clone the options
    var opts = helper._.clone(options)

    try {
      yaml.safeLoadAll(content, function (result) {
        var jsonFilePath = file.path.toString();
        jsonFilePath = jsonFilePath.replace(basePath, '');
        jsonFilePath = jsonFilePath.replace('.json', '');
        jsonFilePath = jsonFilePath.split('/').join('.');
        jsonFilePath = jsonFilePath.slice(1).toLowerCase();

        var TEMPLATE = 'window.__JSON__ = window.__JSON__ || {};\n';
        TEMPLATE += 'window.__JSON__[\''+jsonFilePath+'\'] = ';
        TEMPLATE += JSON.stringify(result)+';';
        done(null, TEMPLATE);
      });
    } catch (e) {
      var msg = null;
      if(e && e.location && e.location.first_line){
        msg = e.location.first_line
      }else if(e && e.location){
        msg = e.location
      }
      log.error('%s\n  at %s:%d', e.message, file.originalPath, msg);
      return done(e, null);
    }
  };
};

createYamlPreprocessor.$inject = [
  'args', 'config.yamlPreprocessor', 'logger', 'helper', 'config.basePath', 'config.files'
];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:yaml': ['factory', createYamlPreprocessor]
};
