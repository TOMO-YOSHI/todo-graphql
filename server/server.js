const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./src/schema');

const apolloServer = new ApolloServer({typeDefs, resolvers});

const app = express();

apolloServer.applyMiddleware({ app });

const port = 5000;

app.listen({ port: port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`)
});
