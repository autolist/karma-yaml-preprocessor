options =
  spawn: false
  livereload: true
  debounceDelay: 150

module.exports =
  script:
    options: options
    files: [
      './source/*.ts'
      './source/**/*.ts'
      './source/**/**/*.ts'
      './source/**/**/**/*.ts'
      './source/**/**/**/**/*.ts'
      './source/**/**/**/**/**/*.ts'
      './source/**/**/**/**/**/**/*.ts'
    ]
    tasks: ['script']
