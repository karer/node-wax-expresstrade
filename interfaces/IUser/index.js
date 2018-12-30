const ETInterface = require('../ETInterface')

class IUser extends ETInterface {
  async CreateVCaseUser({ siteUrl, displayName }) {
    if (siteUrl === undefined) {
      throw new Error('siteUrl not specified!')
    }

    if (displayName === undefined) {
      throw new Error('displayName not specified!')
    }

    const url = this.getUrl() + 'CreateVCaseUser/v1'
    const form = { site_url: siteUrl, display_name: displayName }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async GetInventory({
    appId,
    page = 1,
    perPage,
    search,
    sort,
    filterInTrade
  }) {
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetInventory/v1'

    const res = await this.request.get({
      url,
      qs: {
        app_id: appId,
        page,
        per_page: perPage,
        search,
        sort,
        filter_in_trade: filterInTrade
      }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async GetProfile({ withExtra = false }) {
    const url = this.getUrl() + 'GetProfile/v1'

    const res = await this.request.get({ url, qs: { with_extra: withExtra } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.user
  }

  async UpdateProfile({
    displayName,
    inventoryIsPrivate,
    allowTwoFactorCodeReuse,
    autoAcceptGiftTrades,
    anonymousTransactions
  }) {
    const url = this.getUrl() + 'UpdateProfile/v1'
    const form = {
      display_name: displayName,
      inventory_is_private: inventoryIsPrivate,
      allow_twofactor_code_reuse: allowTwoFactorCodeReuse,
      auto_accept_gift_trades: autoAcceptGiftTrades,
      anonymous_transactions: anonymousTransactions
    }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.user
  }

  async UserReports({ message, reportType, offerId }) {
    if (message === undefined) {
      throw new Error('message not specified!')
    }
    if (reportType === undefined) {
      throw new Error('reportType not specified!')
    }
    if (offerId === undefined) {
      throw new Error('offerId not specified!')
    }

    const url = this.getUrl() + 'UserReports/v1'
    const form = {
      message,
      report_type: reportType,
      offer_id: offerId
    }
    const res = await this.request.post({ url, form })

    if (res.response === undefined) {
      throw new Error(res.message)
    }

    return res.response
  }

  getUrl() {
    return 'IUser/'
  }
}

module.exports = IUser
