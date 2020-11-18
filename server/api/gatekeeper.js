const router = require('express').Router()
const {User} = require('../db/models')

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next()
    } else {
      res.status(403).send()
    }
  }
}
