import React, { useState } from 'react';

import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import RemoveTask from '../buttons/RemoveTask';
import UpdateTask from '../forms/UpdateTask';

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Task = (props) => {
  const [id] = useState(props.id);
  const [task, setTask] = useState(props.task);
  const [date, setDate] = useState(props.date);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const onButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateDisplayedTodo = (updatedTask, updatedDate) => {
    setTask(updatedTask);
    setDate(updatedDate);
  };

  return (
    <div>
      {
        editMode ?
          <UpdateTask
            id={id}
            task={task}
            date={date}
            onButtonClick={onButtonClick}
            updateDisplayedTodo={updateDisplayedTodo}
          />
        :
          <Card
            key={id}
            style={styles.card}
            actions={[
              <EditOutlined key='edit' onClick={onButtonClick} />,
              <RemoveTask id={id} task={task} date={date} />
            ]}
          >
            {`${task} - ${date}`}
          </Card>
      }
    </div>
  );
};

export default Task;