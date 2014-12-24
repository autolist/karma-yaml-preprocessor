
User = (options) ->


User.prototype.module = ->
  @routes =
    'get': (req, res) ->
      res.send 'User'

  return this


exports = module.exports = User
