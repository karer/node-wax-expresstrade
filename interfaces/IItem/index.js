const ETInterface = require('../ETInterface')

class IItem extends ETInterface {
  async GetAllItems({ appId, sku, name, page, perPage, sort, noExclusions }) {
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetAllItems/v1'

    const res = await this.request.get({
      url,
      qs: {
        app_id: appId,
        sku: sku.toString(),
        name,
        page,
        per_page: perPage,
        sort,
        no_exclusions: noExclusions
      }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    res.response.current_page = res.current_page
    res.response.total_pages = res.total_pages

    return res.response
  }

  async GetItemsById({ itemId }) {
    if (itemId === undefined) {
      throw new Error('itemId not specified!')
    }

    const url = this.getUrl() + 'GetItemsById/v1'

    const res = await this.request.get({
      url,
      qs: { item_id: itemId.toString() }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async WithdrawToOpskins({ itemId }) {
    if (itemId === undefined) {
      throw new Error('itemId not specified!')
    }

    const url = this.getUrl() + 'WithdrawToOpskins/v1'
    const form = { item_id: itemId.toString() }

    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  GetItems() {
    throw new Error(
      'GetItems is deprecated. Please use GetItemDefinitions instead.'
    )
  }

  async GetItemDefinitions({ appId, defIdFilter, indexBy, page, perPage }) {
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetItemDefinitions/v1'

    const res = await this.request.get({
      url,
      qs: {
        app_id: appId,
        def_id_filter: defIdFilter.toString(),
        index_by: indexBy,
        page,
        per_page: perPage
      }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    res.response.current_page = res.current_page
    res.response.total_pages = res.total_pages

    return res.response
  }

  async GetRarityStats({ appId, defId }) {
    if (appId === undefined) {
      throw new Error('appId not specified!')
    }

    const url = this.getUrl() + 'GetRarityStats/v1'

    const res = await this.request.get({
      url,
      qs: { app_id: appId, def_id: defId.toString() }
    })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.items
  }

  async InstantSellRecentItems({ itemId, instantSellType = 2 }) {
    if (itemId === undefined) {
      throw new Error('itemId not specified!')
    }

    const url = this.getUrl() + 'WithdrawToOpskins/v1'
    const form = {
      item_id: itemId.toString(),
      instant_sell_type: instantSellType
    }

    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  getUrl() {
    return 'IItem/'
  }
}

module.exports = IItem
