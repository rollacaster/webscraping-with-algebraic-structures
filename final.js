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
const crawlPage = pipe(
  loadPage,
  map(pipe(prop('data')))
)
const findStars = chain(
  pipe(
    scrapePage(
      '.markup--anchor.markup--p-anchor'
    ),
    map(pipe(prop('attribs'), prop('href'))),
    slice(2, Infinity),
    traverse(Future.of, crawlPage),
    map(
      map(
        pipe(
          scrapePage('.social-count'),
          chain(
            pipe(
              prop('children'),
              map(prop('data'))
            )
          ),
          _.init,
          _.last,
          parseInt
        )
      )
    )
  )
)
const findTalks = map(
  pipe(
    scrapePage(
      '.markup--strong.markup--p-strong'
    ),
    chain(
      pipe(prop('children'), map(prop('data')))
    ),
    slice(6, Infinity)
  )
)
const {
  makeThingsPretty
} = require('./pretty-fns')
module.exports = pipe(
  crawlPage,
  makeThingsPretty(findTalks, findStars)
)(
  'http://127.0.0.1/open-call-for-reactiveconf-lightning-talks-2017-a4f5394e5f96.html'
)
