
module.exports =
  all:
    'pre-commit': 'jshint test:unit'
    "post-merge": "package"
