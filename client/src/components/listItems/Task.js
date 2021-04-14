import React, { useState } from 'react';

import { Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import RemoveTask from '../buttons/RemoveTask';

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Task = (props) => {
  const [id] = useState(props.id);
  const [task, setTask] = useState(props.task);
  const [date, setDate] = useState(props.date);

  const styles = getStyles();

  return (
    <div>
      <Card
        key={id}
        style={styles.card}
        actions={[
          <EditOutlined key='edit' onClick={()=>console.log('edit clecked')} />,
          <RemoveTask id={id} task={task} date={date} />
        ]}
      >
        {`${task} - ${date}`}
      </Card>
    </div>
  );
};

export default Task;