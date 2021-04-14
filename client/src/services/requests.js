import {gql} from "@apollo/client";

export const GET_TASKS = gql`
    {
        tasks {
            id
            task
            date
        }
    }
`

export const ADD_TASK = gql`
mutation AddTask($id: String!, $task: String!, $date: String!)
{
  addTask(id: $id, task: $task, date:$date) {
    id
    task
    date
  }
}
`

export const REMOVE_TASK = gql`
mutation RemoveTask($id: String!) 
{
  removeTask(id: $id) {
    id
    task
    date
  }
}
`