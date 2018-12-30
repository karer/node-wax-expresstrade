const ETInterface = require('../ETInterface')

class ICase extends ETInterface {
  async GetCaseSchema({ cases }) {
    const url = this.getUrl() + 'GetCaseSchema/v1'

    const res = await this.request.get({ url, qs: { cases } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.cases
  }

  async GetCaseOdds({ cases }) {
    const url = this.getUrl() + 'GetCaseOdds/v1'

    const res = await this.request.get({ url, qs: { cases } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.cases
  }

  async GetMinimumOpenVolume() {
    const url = this.getUrl() + 'GetMinimumOpenVolume/v1'

    const res = await this.request.get({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.count
  }

  getUrl() {
    return 'ICase/'
  }
}

module.exports = ICase
