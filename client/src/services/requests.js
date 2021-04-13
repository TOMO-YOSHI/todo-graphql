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