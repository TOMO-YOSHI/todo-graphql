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
    },
    {
        id: '3',
        task: 'Studying',
        date: '2021/04/25'
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

    type Mutation {
        addTask(id: String!, task: String!, date: String!): Task
        updateTask(id: String!, task: String!, date: String!): Task
        removeTask(id: String!): Task
    }
`

const resolvers = {
    Query: {
        tasks: () => tasks,
        task(parent, args, context, info) {return find(tasks, { id: args.id })}
    },
    Mutation: {
        addTask: (root, {id, task, date}) => {
            const newTask = {
                id: id,
                task: task,
                date: date
            };
            tasks.push(newTask)
            return newTask;
        },
        updateTask: (root, {id, task, date}) => {
            const exTask = find(tasks, {id: id});
            if(!task) {
                throw new Error(`Couldn't find task with id ${args.id}`)
            }

            exTask.task = task;
            exTask.date = date;
            return exTask
        },
        removeTask: (root, {id}) => {
            const removedTask = find(tasks, { id: id });
            if(!removedTask) {
                throw new Error(`Couldn't find task with id ${id}`);
            };

            remove(tasks, task => {
                return task.id === removedTask.id;
            });
            return removedTask;
        }
    }
};

module.exports = { typeDefs, resolvers };