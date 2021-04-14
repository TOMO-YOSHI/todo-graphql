import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { Form, Input, Button } from 'antd';

import { GET_TASKS, UPDATE_TASK } from '../../services/requests';

const UpdateTask = (props) => {
  const [id] = useState(props.id);
  const [task] = useState(props.task);
  const [date] = useState(props.date);
  const [form] = Form.useForm();

  const [updateTask] = useMutation(UPDATE_TASK);
  // const [updateTask] = useMutation(UPDATE_TASK, {
  //   update(proxy, { data: { updateTask } }) {
  //     const data = proxy.readQuery({ query: GET_TASKS });
  //     const targetIndex = data.tasks.findIndex(task => task.id === updateTask.id);
  //     const newTasks = [...data.tasks];
  //     newTasks[targetIndex] = updateTask; // This line retunrs because it is a read only property.
  //     console.log(data);
  //     console.log(newTasks);
  //     console.log(updateTask);
  //     proxy.writeQuery({
  //       query: GET_TASKS,
  //       data: {
  //         // ...data,
  //         tasks: newTasks
  //       }
  //     })
  //   }
  // });

  const onFinish = (values) => {
    const { task, date } = values;

    updateTask({
      variables: {
        id,
        task,
        date
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateTask: {
          __typename: 'Task',
          id,
          task,
          date
        }
      }
    });
    props.updateDisplayedTodo(task, date);
    props.onButtonClick();
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        task: task,
        date: date
      }}
      size='large'
    >
      <Form.Item
        name='task'
        rules={[{ required: true, message: 'Please input task!' }]}
      >
        <Input
          placeholder='i.e. Cleaning'
        />
      </Form.Item>
      <Form.Item
        name='date'
        rules={[{ required: true, message: 'Please input date!' }]}
      >
        <Input
          placeholder='i.e. 2021/05/30'
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('task') && !form.isFieldTouched('date')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Task
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateTask;