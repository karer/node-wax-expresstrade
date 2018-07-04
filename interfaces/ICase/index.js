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

  async GetMinifmumOpenVolume() {
    const url = this.getUrl() + 'GetMinimumOpenVolume/v1'

    const res = await this.request.get({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.count
  }

  async OpenWithKeys({ caseId, amount }) {
    if (caseId === undefined) {
      throw new Error('caseId not specified!')
    }

    const url = this.getUrl() + 'OpenWithKeys/v1'
    const form = { case_id: caseId, amount }

    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.cases
  }

  getUrl() {
    return 'ICase/'
  }
}

module.exports = ICase
