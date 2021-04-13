import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../services/requests';

const Tasks = () => {
    const { loading, error, data } = useQuery(GET_TASKS);
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    // console.log('data', data.tasks)

    return (
        <div>
            {
                
                data.tasks.map((item, index)=>{
                    return <p key={item.id}>{item.task}</p>
                })
                
            }
        </div>
    );
};

export default Tasks;