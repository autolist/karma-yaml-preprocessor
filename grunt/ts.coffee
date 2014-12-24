options =
  verbose: true
  target: '<%=ES_TARGET%>' # es5 | es3
  noImplicitAny: true
  module: '<%=MODULE_TYPE%>' # commonjs | amd
  failOnTypeErrors: true
  declaration: false
  comments: true
  fast: 'never' # watch | always | never
  sourceMap: '<%=SOURCE_MAPS%>'
  sourceRoot: '<%=STAGING_PATH%>/ts'
  mapRoot: '<%=STAGING_PATH%>/ts'

unless options.sourceMap is 'true'
  options.sourceRoot = null
  options.mapRoot = null

source = [
  '<%=SOURCE_PATH%>/**/*.ts'
  '<%=SOURCE_PATH%>/**/**/*.ts'
  '<%=SOURCE_PATH%>/**/**/**/*.ts'
  '<%=SOURCE_PATH%>/**/**/**/**/*.ts'
  '<%=SOURCE_PATH%>/**/**/**/**/**/*.ts'
  '<%=SOURCE_PATH%>/**/**/**/**/**/**/*.ts'
]

module.exports =
  script:
    options: options
    outDir: '<%=PRODUCTION_PATH%>'
    src: source
