
module.exports =
  dist:
    src: ['<%=PRODUCTION_PATH%>']

  staging:
    src: ['<%=STAGING_PATH%>']

  script:
    src: [
      '.tmp/coffee'
      'lib/*.js'
      'lib/*.js.map'
      'lib/*.ts'
    ]

  publish:
    src: [
      'lib/.baseDir.js'
    ]
