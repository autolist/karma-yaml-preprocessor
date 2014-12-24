declare function require(name:string): any;
declare var module: any;

var yaml = require('js-yaml');
var path = require('path');

var YamlPreprocessor:any = function(args:any, config:any, logger:any, helper:any , basePath:string ):any {
  var config:any = config || {};
  var log:any = logger.create('preprocessor.yaml');

  var defaultOptions:Object = {
    bare: true,
    sourceMap: false
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformPath:Function = args.transformPath || config.transformPath || function(filepath:string) {
    return filepath.replace(/\.yml$/, '.json');
  };

  return function parse(content:string, file:any, done:Function) {
    log.debug('Processing "%s".', file.originalPath);
    file.path = transformPath(file.originalPath);
    var opts:any = helper._.clone(options);

    try {
      yaml.safeLoadAll(content, function (result:string) {
        var jsonFilePath:string = file.path.toString();
        jsonFilePath = jsonFilePath.replace(basePath, '');
        jsonFilePath = jsonFilePath.replace('.json', '');
        jsonFilePath = jsonFilePath.split('/').join('.');
        jsonFilePath = jsonFilePath.slice(1).toLowerCase();

        var TEMPLATE:string = 'window.__JSON__ = window.__JSON__ || {};\n';
        TEMPLATE += 'window.__JSON__[\''+jsonFilePath+'\'] = ';
        TEMPLATE += JSON.stringify(result)+';';
        done(null, TEMPLATE);
      });
    } catch (error) {
      var msg:any = null;
      if(error && error.location && error.location.first_line){
        msg = error.location.first_line
      }else if(error && error.location){
        msg = error.location
      }
      log.error('%s\n  at %s:%d', error.message, file.originalPath, msg);
      return done(error, null);
    }
  }
}

YamlPreprocessor.$inject = [
  'args',
  'config.yamlPreprocessor',
  'logger',
  'helper',
  'config.basePath',
  'config.files'
];

module.exports = {
  'preprocessor:yaml': ['factory', YamlPreprocessor]
};
