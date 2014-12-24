var yaml = require('js-yaml');
var path = require('path');

var YamlPreprocessor = function (args, config, logger, helper, basePath) {
    var config = config || {};
    var log = logger.create('preprocessor.yaml');

    var defaultOptions = {
        bare: true,
        sourceMap: false
    };

    var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

    var transformPath = args.transformPath || config.transformPath || function (filepath) {
        return filepath.replace(/\.yml$/, '.json');
    };

    return function parse(content, file, done) {
        log.debug('Processing "%s".', file.originalPath);
        file.path = transformPath(file.originalPath);
        var opts = helper._.clone(options);

        try  {
            yaml.safeLoadAll(content, function (result) {
                var jsonFilePath = file.path.toString();
                jsonFilePath = jsonFilePath.replace(basePath, '');
                jsonFilePath = jsonFilePath.replace('.json', '');
                jsonFilePath = jsonFilePath.split('/').join('.');
                jsonFilePath = jsonFilePath.slice(1).toLowerCase();

                var TEMPLATE = 'window.__JSON__ = window.__JSON__ || {};\n';
                TEMPLATE += 'window.__JSON__[\'' + jsonFilePath + '\'] = ';
                TEMPLATE += JSON.stringify(result) + ';';
                done(null, TEMPLATE);
            });
        } catch (error) {
            var msg = null;
            if (error && error.location && error.location.first_line) {
                msg = error.location.first_line;
            } else if (error && error.location) {
                msg = error.location;
            }
            log.error('%s\n  at %s:%d', error.message, file.originalPath, msg);
            return done(error, null);
        }
    };
};

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
