const bcrypt = require('bcryptjs')

const getHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const matchHashPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { getHashPassword, matchHashPassword }
