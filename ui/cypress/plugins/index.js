// https://on.cypress.io/plugins-guide

module.exports = (on, config) => {
  
  require('@cypress/code-coverage/task')(on, config)

  return config
  
}
