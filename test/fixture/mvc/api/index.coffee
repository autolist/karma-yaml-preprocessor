
Api = (options) ->


Api.prototype.module = ->
  @routes =
    'get': (req, res) ->
      res.send 'Api'

  return this


exports = module.exports = Api
