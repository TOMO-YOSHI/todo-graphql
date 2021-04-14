import React from 'react';
import { useMutation } from '@apollo/client';
import { filter } from 'lodash';

import { DeleteOutlined } from '@ant-design/icons';

const RemoveTask = ({id, task, date}) => {
  return (
    <DeleteOutlined key='delete' style={{ color: 'red' }} onClick={() => { console.log(id, task, date)}} />
  );
};

export default RemoveTask;