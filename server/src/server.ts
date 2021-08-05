import { ApolloServer } from "apollo-server-express"
import { importSchema } from "graphql-import";
import { Resolvers } from './schemaTypes'
import { GQLContext } from './GQLContext'
import { TasksAPI } from './dataSources/tasks/tasksAPI'
import { taskResolver, tasksQueryResolvers } from './resolvers/taskResolver'

import express from 'express'

const typeDefs = importSchema("./src/schema.graphql")

const resolvers: Resolvers = {
  Task: taskResolver,
  Query: {
    ...tasksQueryResolvers
  }
}

const app = express()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: (): GQLContext["dataSources"] => ({
    tasksAPI: new TasksAPI(),
  }),
  introspection: true,
})

server.start().then( _response => {
  server.applyMiddleware({ app })

  app.listen({ port: 3000 }, () =>
    console.log(
      `🚀 GraphQL Server ready at http://localhost:3000${server.graphqlPath}`
    )
  )
})
