const _ = require('ramda')
const { Future } = require('ramda-fantasy')

exports.makeThingsPretty = (
  findTalks,
  findStars
) =>
  _.pipe(
    _.juxt([findTalks, findStars]),
    _.sequence(Future.of),
    _.lift(
      _.pipe(
        _.apply(_.zip),
        _.sortBy(_.last),
        _.reverse,
        _.map(_.join(': 🌟'))
      )
    )
  )
