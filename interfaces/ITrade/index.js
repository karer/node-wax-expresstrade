const ETInterface = require('../ETInterface')

class ITrade extends ETInterface {
  async AcceptOffer({ offerId }) {
    if (offerId === undefined) {
      throw new Error('offerId not specified!')
    }

    const url = this.getUrl() + 'AcceptOffer/v1'
    const twofactor_code = this.generateToken()
    const form = { twofactor_code, offer_id: offerId }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async CancelOffer({ offerId }) {
    if (offerId === undefined) {
      throw new Error('offerId not specified!')
    }

    const url = this.getUrl() + 'CancelOffer/v1'
    const form = { offer_id: offerId }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.offer
  }

  async GetApps({}) {
    const url = this.getUrl() + 'GetApps/v1'

    const res = await this.request.get({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.apps
  }

  async GetOffer({ offerId }) {
    if (offerId === undefined) {
      throw new Error('offerId not specified!')
    }

    const url = this.getUrl() + 'GetOffer/v1'

    const res = await this.request.get({ url, qs: { offer_id: offerId } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.offer
  }

  async GetOffers({ uid, state, type, page = 1, perPage = 100, ids }) {
    const url = this.getUrl() + 'GetOffers/v1'

    const res = await this.request.get({
      url,
      qs: {
        uid,
        state,
        type,
        page,
        per_page: perPage,
        ids: ids ? ids.toString() : undefined
      }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async GetTradeURL({}) {
    const url = this.getUrl() + 'GetTradeURL/v1'

    const res = await this.request.get({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async GetUserInventory({ uid, appId, page = 1, perPage, search, sort }) {
    if (uid === undefined) {
      throw new Error('uid not specified!')
    }
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetUserInventory/v1'

    const res = await this.request.get({
      url,
      qs: { uid, app_id: appId, page, per_page: perPage, search, sort }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    res.response.current_page = res.current_page
    res.response.total_pages = res.total_pages

    return res.response
  }

  async GetUserInventoryFromSteamId({
    steamId,
    appId,
    page = 1,
    perPage,
    search,
    sort
  }) {
    if (steamId === undefined) {
      throw new Error('steamId not specified!')
    }
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetUserInventoryFromSteamId/v1'

    const res = await this.request.get({
      url,
      qs: {
        steam_id: steamId,
        app_id: appId,
        page,
        per_page: perPage,
        search,
        sort
      }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async RegenerateTradeUrl({}) {
    const url = this.getUrl() + 'RegenerateTradeUrl/v1'
    const res = await this.request.post({ url })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async SendOffer({
    uid,
    token,
    tradeUrl,
    expirationTime,
    message,
    itemsToSend = [],
    itemsToReceive = []
  }) {
    if (tradeUrl === undefined && (uid === undefined || token === undefined)) {
      throw new Error('Please pass [uid + token] or [tradeUrl].')
    }

    const url = this.getUrl() + 'SendOffer/v1'
    const twofactor_code = this.generateToken()
    const form = {
      twofactor_code,
      uid,
      token,
      trade_url: tradeUrl,
      items_to_send: itemsToSend.toString(),
      items_to_receive: itemsToReceive.toString(),
      expiration_time: expirationTime,
      message
    }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.offer
  }

  async SendOfferToSteamId({
    steamId,
    expirationTime,
    message,
    itemsToSend = [],
    itemsToReceive = []
  }) {
    if (steamId === undefined) {
      throw new Error('steamId not specified!')
    }

    const url = this.getUrl() + 'SendOfferToSteamId/v1'
    const twofactor_code = this.generateToken()
    const form = {
      twofactor_code,
      steam_id: steamId,
      items_to_send: itemsToSend.toString(),
      items_to_receive: itemsToReceive.toString(),
      expiration_time: expirationTime,
      message
    }
    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.offer
  }

  getUrl() {
    return 'ITrade/'
  }
}

module.exports = ITrade
