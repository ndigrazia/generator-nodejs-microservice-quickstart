const properties = require('../../package.json')
const { success } = require('../util/response')

const info = (req, res) => {
  const aboutInfo = {
    name: properties.name,
    description: properties.description,
    author: {
      name: properties.author.name,
      email: properties.author.email
    }
  }

  success(res)(aboutInfo)
}

exports.info = info
