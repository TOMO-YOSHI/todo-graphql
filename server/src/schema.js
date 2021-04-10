const { gql } = require('apollo-server-express');
const { find, remove } = require('lodash');

const tasks = [
    {
        id: '1',
        task: 'Cleaning',
        date: '2021/04/10'
    },
    {
        id: '2',
        task: 'Shopping',
        date: '2021/04/20'
    }
]

const typeDefs = gql`
    type Task {
        id: String!
        task: String
        date: String
    }

    type Query {
        task(id: String!): Task
        tasks: [Task]
    }
`

const resolvers = {
    Query: {
        tasks: () => tasks,
        task(parent, args, context, info) {return find(tasks, { id: args.id })}
    }
};

module.exports = { typeDefs, resolvers };