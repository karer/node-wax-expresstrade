const ETInterface = require('../ETInterface')

class ICaseSite extends ETInterface {
  async GetKeyCount({ tradeUrl, steamId }) {
    if (tradeUrl === undefined && steamId === undefined) {
      throw new Error('tradeUrl or steamId not specified!')
    }

    const url = this.getUrl() + 'GetKeyCount/v1'

    const res = await this.request.get({ url, qs: { trade_url: tradeUrl, steam_id: steamId } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.key_count
  }

  async GetTradeStatus({ offerId }) {
    const url = this.getUrl() + 'GetTradeStatus/v1'

    if (offerId === undefined) {
      throw new Error('offerId not specified!')
    }

    const res = await this.request.get({ url, qs: { offer_id: offerId } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async SendKeyRequest({ tradeUrl, steamId, caseId, affiliateEthAddress, amount = 1 }) {
    if (tradeUrl === undefined && steamId === undefined) {
      throw new Error('tradeUrl or steamId not specified!')
    }

    if (caseId === undefined) {
      throw new Error('caseId not specified!')
    }

    if (affiliateEthAddress === undefined) {
      throw new Error('affiliateEthAddress not specified!')
    }

    const url = this.getUrl() + 'SendKeyRequest/v1'
    const form = { trade_url: tradeUrl, steam_id: steamId, case_id: caseId, affiliate_eth_address: affiliateEthAddress, amount }

    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  getUrl() {
    return 'ICaseSite/'
  }
}

module.exports = ICaseSite
