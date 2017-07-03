const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./type-definitions')
const resolvers = require('./resolvers')

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
