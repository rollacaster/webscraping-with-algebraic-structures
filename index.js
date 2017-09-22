const axios = require('axios')
const cheerio = require('cheerio')
const {
  prop,
  slice,
  map,
  split,
  chain,
  trim,
  last,
  traverse,
  pipe,
  head,
  match,
  zip,
  lift,
  join
} = require('ramda')
const { Future } = require('ramda-fantasy')

// get :: String -> Future Error Request
const get = url =>
  Future((reject, resolve) =>
    axios
      .get(url, { headers: { accept: 'text/html' }, responseType: 'text' })
      .then(resolve)
      .catch(reject)
  )

// getCheerioData :: Request -> String
const getCheerioData = pipe(prop('data'), cheerio.load)

// getOpenCalls :: String -> String
const getOpenCalls = get(
  'https://blog.reactiveconf.com/open-call-for-reactiveconf-lightning-talks-2017-a4f5394e5f96'
).map(getCheerioData)

// findCompetitors :: Future Error [String]
const findCompetitors = getOpenCalls
  .map($ =>
    $('p a strong')
      .map((_, el) => $(el).text())
      .get()
  )
  .map(slice(1, Infinity))
  .map(map(split(':')))
  .map(chain(last))
  .map(map(trim))

// getStars :: String -> String
const getStars = pipe(
  getCheerioData,
  $ =>
    $('.social-count')
      .map((_, el) => $(el).text())
      .get(),
  head,
  match(/\d+/),
  head
)
// findStarCount :: Future Error [String]
const findStarCount = getOpenCalls
  .map($ =>
    $('p a')
      .map((_, el) => $(el).attr('href'))
      .get()
  )
  .map(slice(2, Infinity))
  .map(traverse(Future.of, get))
  .chain(map(map(getStars)))

// app :: Future Error [String]
const app = lift(zip)(findCompetitors, findStarCount).map(map(join(' | 🌟 ')))

app.fork(console.error, console.log)
