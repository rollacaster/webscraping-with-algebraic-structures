const _ = require('ramda')
const { Future } = require('ramda-fantasy')
const axios = require('axios')
const cheerio = require('cheerio')
const {
  compareTwoStrings
} = require('string-similarity')

exports.loadPage = url =>
  Future((reject, resolve) =>
    axios
      .get(url, {
        headers: { accept: 'text/html' }
      })
      .then(resolve)
      .catch(reject)
  )

exports.scrapePage = selector =>
  _.pipe(cheerio.load, $ => $(selector).get())

exports.compareStrings = topic1 => topic2 =>
  compareTwoStrings(topic1, topic2)
