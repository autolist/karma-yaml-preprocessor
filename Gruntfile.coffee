require 'coffee-script/register'

module.exports = (grunt) ->
  require('time-grunt') grunt
  require('load-grunt-tasks') grunt,
    scope: 'devDependencies'

  require('grunt-autoload-config') grunt,
    path: './grunt/'
    ext: '.coffee'
    initConfig:
      pkg: grunt.file.readJSON 'package.json'
      SOURCE_MAPS: false
      MODULE_NAME: 'waitForUrl'
      ES_TARGET: 'es5' # es5 | es3
      MODULE_TYPE: 'amd' # commonjs | amd
      BASE_PATH: ''
      DEVELOPMENT_PATH: '.dev/'
      PRODUCTION_PATH: 'lib/'
      SOURCE_PATH: 'source/'
      STAGING_PATH: '.tmp/'

  grunt.registerTask 'release', 'Release a new version, push it and publish', (target) ->
    runTask = ['bump:patch']
    runTask.push 'bump' if target is 'bump'
    runTask.push 'bump:patch' if target is 'patch' or target is 'force'
    runTask.push 'bump:minor' if target is 'minor'
    runTask.push 'bump:major' if target is 'major'
    runTask.push 'bump:prerelease' if target is 'dev'
    runTask = ['build','bump:git'] if target is 'git'
    grunt.task.run runTask
