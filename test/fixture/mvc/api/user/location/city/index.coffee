
CityNy = (options) ->


CityNy.prototype.module = ->
  @routes =
    'get': (req, res) ->
      res.send 'CityNy'

  return this


exports = module.exports = CityNy
