class ETInterface {
  constructor({ request, generateToken }) {
    if (request === undefined) {
      throw new Error('request not specified!')
    }

    this.request = request
    this.generateToken = generateToken
  }
}

module.exports = ETInterface
