const _ = require('ramda')
const {
  // algebraic operations
  map,
  traverse,
  chain,
  // helper functions
  pipe,
  prop,
  slice
} = _
const { Future } = require('ramda-fantasy')

const {
  // loadPage :: URL -> Future Error Response
  loadPage,
  // scrapePage :: Selector -> HTML -> [DOMElement]
  scrapePage
} = require('./scrape-fns')

module.exports = loadPage(
  'http://127.0.0.1/open-call-for-reactiveconf-lightning-talks-2017-a4f5394e5f96.html'
)
