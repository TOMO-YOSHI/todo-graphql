import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/requests';

import { List } from 'antd';
import Task from '../listItems/Task';

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Tasks = () => {
    const { loading, error, data } = useQuery(GET_TASKS);
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const styles = getStyles();

    // console.log('data', data.tasks)

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {
                data.tasks.map((item, index)=>
                    <List.Item key={item.id}>
                        <Task id={item.id} task={item.task} date={item.date} />
                    </List.Item>
                )
            }
        </List>
    );
};

export default Tasks;