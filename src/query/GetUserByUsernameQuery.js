const getUserByUsername = 'SELECT username, password FROM users WHERE username = $1 ;'

module.exports = { getUserByUsername}