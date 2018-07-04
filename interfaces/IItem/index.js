const ETInterface = require('../ETInterface')

class IItem extends ETInterface {
  async GetItemsById({ itemId }) {
    if (itemId === undefined) {
      throw new Error('itemId not specified!')
    }

    const url = this.getUrl() + 'GetItemsById/v1'

    const res = await this.request.get({ url, qs: { item_id: itemId } })

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
    const form = { item_id: itemId }

    const res = await this.request.post({ url, form })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response
  }

  async GetItems({ skuFilter }) {
    const url = this.getUrl() + 'GetItems/v1'

    const res = await this.request.get({ url, qs: { sku_filter: skuFilter } })

    if (!res.response) {
      throw new Error(res.message)
    }

    return res.response.items
  }

  getUrl() {
    return 'IItem/'
  }
}

module.exports = IItem
