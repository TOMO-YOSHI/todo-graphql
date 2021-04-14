import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Form, Input, Button } from 'antd';

import { v4 as uuidv4 } from 'uuid';
import { ADD_TASK, GET_TASKS } from '../../services/requests';

const AddTodo = () => {
  const [id] = useState(uuidv4());
  const [addTask] = useMutation(ADD_TASK);

  const [form] = Form.useForm();

  const onFinish = values => {
    const { task, date } = values;

    addTask({
      variables: {
        id,
        task,
        date
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addTask: {
          __typename: 'Task',
          id,
          task,
          date
        }
      },
      update: (proxy, {data: {addTask}}) => {
        const data = proxy.readQuery({ query: GET_TASKS });
        proxy.writeQuery({
          query: GET_TASKS,
          data: {
            ...data,
            tasks: [...data.tasks, addTask]
          }
        })
      }
    })

  }

  return (
    <Form
      form={form}
      name='add-task-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{marginBottom: '40px'}}
    >
      <Form.Item
        name='task'
        rules={[{ required: true, message: 'Please input task!' }]}
      >
        <Input placeholder='i.e. Walking' />
      </Form.Item>
      <Form.Item
        name='date'
        rules={[{ required: true, message: 'Please input date!' }]}
      >
        <Input placeholder='i.e. 2021/4/20' />
      </Form.Item>

      <Form.Item shouldUpdate>
        {()=>(
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldTouched('task') ||
              !form.isFieldTouched('date') ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Task
          </Button>
        )}
      </Form.Item>

    </Form>
  );
};

export default AddTodo;