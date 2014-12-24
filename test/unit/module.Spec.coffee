describe 'karma-yaml-preprocessor', ->
  karmaYamlPreprocessor = require '../../lib/yamlPreprocessor'

  it 'should have property', ->
    yamlPreprocessor = karmaYamlPreprocessor['preprocessor:yaml'][1]
    expect(yamlPreprocessor).to.exist
    expect(yamlPreprocessor.$inject).to.exist
    expect(yamlPreprocessor).to.be.instanceof Function
    expect(yamlPreprocessor.$inject).to.be.instanceof Array
