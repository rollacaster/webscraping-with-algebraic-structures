const shortjson = require('shortjson')
const getLightningTalks = require('./lightning-talk')

getLightningTalks.fork(console.log, shortjson)
