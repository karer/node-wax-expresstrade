const ETInterface = require('../ETInterface')

class ICaseSite extends ETInterface {
  async GetContractAddress({}) {
    const url = this.getUrl() + 'GetContractAddress/v1'

    const res = await this.request.get({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.contract_address
  }

  getUrl() {
    return 'IEthereum/'
  }
}

module.exports = ICaseSite
