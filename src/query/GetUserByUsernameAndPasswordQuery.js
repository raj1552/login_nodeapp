const getUserByUsernameAndPassword = 'INSERT INTO users (username, password) VALUES ($1, $2);'

module.exports = { getUserByUsernameAndPassword}