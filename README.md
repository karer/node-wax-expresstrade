# WAX ExpressTrade API for Node.js

[![npm version](https://img.shields.io/npm/v/wax-expresstrade.svg)](https://npmjs.com/package/wax-expresstrade)
[![dependencies](https://img.shields.io/david/karer/node-wax-expresstrade.svg)](https://david-dm.org/karer/node-wax-expresstrade)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
[![paypal](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://www.paypal.me/devkarer/0usd)

Powerful async/await based Node.js implementation of [OPSkins WAX ExpressTrade](https://github.com/OPSkins/trade-opskins-api 'OPSkins WAX ExpressTrade').

Stop wasting time on coding endpoint communication, event polling and bothering with two factor authentication - just pass your api key with secret and use methods out-of-the-box.

## Installation

    npm i wax-expresstrade --save

## Powerful!

:arrows_counterclockwise: We base on official implementation - it means, that interfaces, methods and responses are identically named as in [documentation](https://github.com/OPSkins/trade-opskins-api). E.g. [IUser/GetInventory](https://github.com/OPSkins/trade-opskins-api/blob/master/IUser/GetInventory.md) refers to `API.IUser.GetInventory()` method.

:rocket: The entire module is async/await friendly - so you do not need to worry about promisifying or callback hell.

:sparkles: All trade-offers updates are emitted as event, which makes catching changes unbelievably easy! E.g. `API.on('OfferChanged', offer => console.log(offer))`

:fire: Two-Factor authentication? Naah! wax-expresstrade handles all this stuff with no additional configuration, just pass twoFactorSecret and... that's all!

## Usage

```javascript
const ExpressTrade = require('wax-expresstrade')

// First, initialize our module
const API = new ExpressTrade({
  apiKey: 'OPSkins API Key goes here',
  twoFactorSecret: 'Secret from opskins mobile auth goes here',
  pollInterval: 3000 // Optional, but just set this one value and module will handle all offers updates automatically!
})

// It's ready to use, wasn't it simple?
const appId = 1 // VGO

const mySkins = await API.IUser.GetInventory({ appId })
const anotherOneSkins = await API.ITrade.GetUserInventory({ uid: 72789, appId })

console.log(`You have ${mySkins.items.length} skins and your friend has got ${anotherOneSkins.items.length} ones!`)
```

## Methods

Basically, there is no need to re-define available methods. Take a look into [documentation](https://github.com/OPSkins/trade-opskins-api 'OPSkins WAX ExpressTrade'), look for module (e.g. `IItem`) and method (e.g. `GetItems`)

Execute node code with `const items = await API.IItem.GetItems({ skuFilter: [10, 20, 25, 40] })`

## Events

IMPORTANT: You need to set pollInterval value in milliseconds (min. 1000) to make module emit events!

Intercepting events is really easy, take a look:

```javascript
const API = ... // ExpressTrade initialization is described above in "Usage" section

API.on('OfferChanged', offer => {
	console.log(`Offer #${offer.id} changed its state to ${offer.state}!`)
	console.log(`That offer was sent by ${offer.sent_by_you ? 'you' : 'someone else'}`)
})
```

### OfferChanged

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted alongside with state-changed events of offers, which have been already created (e.g. `OfferAccepted`, `OfferDeclined`, but not `OfferSent`/`OfferReceived`).

### OfferSent

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when we successfully send an offer.

### OfferReceived

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when we receive new offer.

### OfferAccepted

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when we successfully accept an offer.

### OfferExpired

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer expires.

### OfferCancelled

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer gets cancelled.

### OfferDeclined

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer gets declined.

### OfferNoLongerValid

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when an offer expires.

### OfferCasePending

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when the case offer gets pending state.

### OfferCaseExpired

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when the case offer expires.

### OfferCaseFailed

- `offer` - [Trade Offer Object](https://github.com/OPSkins/trade-opskins-api/blob/master/ITrade.md#standard-trade-offer-object)

Emitted when the case offer fails.
