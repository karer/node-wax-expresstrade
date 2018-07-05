const EventEmitter = require('events')
const request = require('request-promise')
const speakeasy = require('speakeasy')

const ICase = require('./interfaces/ICase')
const ICaseSite = require('./interfaces/ICaseSite')
const IEthereum = require('./interfaces/IEthereum')
const IItem = require('./interfaces/IItem')
const ITrade = require('./interfaces/ITrade')
const IUser = require('./interfaces/IUser')

const OfferState = require('./interfaces/ITrade/states')

class ExpressTrade extends EventEmitter {
  constructor(options) {
    super()

    // Check for config
    if (typeof options !== 'object') {
      throw new Error('Options not specified!')
    }

    if (options.apiKey === undefined) {
      throw new Error('apiKey not specified!')
    }

    if (options.twoFactorSecret === undefined) {
      throw new Error('twoFactorSecret not specified!')
    }

    // Initialize internal settings
    this.options = {
      apiUrl: 'https://api-trade.opskins.com/',
      pollInterval: null,
      ...options
    }

    this.request = request.defaults({
      baseUrl: this.options.apiUrl,
      auth: { user: this.options.apiKey },
      json: true
    })

    // Initialize interfaces
    this.ICase = new ICase({ request: this.request })
    this.ICaseSite = new ICaseSite({ request: this.request })
    this.IEthereum = new IEthereum({ request: this.request })
    this.IItem = new IItem({ request: this.request })
    this.ITrade = new ITrade({ request: this.request, generateToken: () => this.generateToken() })
    this.IUser = new IUser({ request: this.request })

    // Polling
    this.pollData = {}

    if (this.options.pollInterval !== null) {
      if (this.options.pollInterval < 1000) {
        throw new Error('pollInterval minimal value is 1000. Please change it!')
      }

      this.startPolling(this.options.pollInterval)
    }
  }

  startPolling(interval) {
    this.pollInterval = setInterval(() => this.poll(), interval)
  }

  stopPolling() {
    clearInterval(this.pollInterval)
    this.pollInterval = undefined
  }

  async poll() {
    let offers

    try {
      offers = (await this.ITrade.GetOffers({})).offers
    } catch (err) {
      console.log(`Cannot poll offers - ${err.message}`)
    }

    let pollData = {}

    // First-run time poll
    if (Object.keys(this.pollData).length === 0) {
      for (let offer of offers) {
        pollData[offer.id] = offer
      }

      this.pollData = pollData

      return
    }

    for (let offer of offers) {
      const newState = offer.state

      pollData[offer.id] = offer

      if (this.pollData[offer.id] === undefined) {
        const event = offer.sent_by_you ? 'OfferSent' : 'OfferReceived'
        this.emit(event, offer)
      } else if (newState !== this.pollData[offer.id].state) {
        this.emit('OfferChanged', offer)

        switch (newState) {
          case OfferState.STATE_ACCEPTED:
            this.emit('OfferAccepted', offer)
            break
          case OfferState.STATE_EXPIRED:
            this.emit('OfferExpired', offer)
            break
          case OfferState.STATE_CANCELLED:
            this.emit('OfferCancelled', offer)
            break
          case OfferState.STATE_DECLINED:
            this.emit('OfferDeclined', offer)
            break
          case OfferState.STATE_INVALID_ITEMS:
            this.emit('OfferNoLongerValid', offer)
            break
          case OfferState.STATE_PENDING_CASE_OPEN:
            this.emit('OfferCasePending', offer)
            break
          case OfferState.STATE_EXPIRED_CASE_OPEN:
            this.emit('OfferCaseExpired', offer)
            break
          case OfferState.STATE_FAILED_CASE_OPEN:
            this.emit('OfferCaseFailed', offer)
            break
        }
      }
    }

    // Save new pollData
    this.pollData = pollData
  }

  generateToken() {
    return speakeasy.totp({
      secret: this.options.twoFactorSecret,
      encoding: 'base32'
    })
  }
}

module.exports = ExpressTrade
