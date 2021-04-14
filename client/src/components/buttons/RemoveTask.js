import React from 'react';
import { useMutation } from '@apollo/client';
import { filter } from 'lodash';

import { DeleteOutlined } from '@ant-design/icons';
import { GET_TASKS, REMOVE_TASK } from '../../services/requests';

const RemoveTask = ({id, task, date}) => {

  const [removeTask] = useMutation(REMOVE_TASK, {
    update(proxy, { data: { removeTask } }) {
      const { tasks } = proxy.readQuery({query: GET_TASKS});
      proxy.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: filter(tasks, task => {
            return task.id !== removeTask.id;
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this task?');
    if(result){
      removeTask({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeTask: {
            __typename: 'Task',
            id,
            task,
            date
          }
        }
      })
    }
  }

  return (
    <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={handleButtonClick} />
  );
};

export default RemoveTask;