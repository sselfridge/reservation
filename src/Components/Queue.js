import React from 'react';
import QueueItem from './QueueItem';

const Queue = props => {

  const itemQ = [];
  if (typeof props.queue !== "boolean" && props.queue) {
    props.queue.forEach((user, i) => {
      const newItem = <QueueItem name={user} key={`q${i}`} />;
      itemQ.push(newItem);
    });
  }

  return <div className="Queue">{itemQ}</div>;
};

export default Queue;
