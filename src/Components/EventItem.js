import React from 'react';

const EventItem = props => {
  const dateObj = new Date(props.start);
  const time = (props.duration / 1000 / 60).toFixed(2);

  const month = dateObj.getMonth();
  const date = dateObj.getDate();
  const hour = dateObj.getHours();
  const min = dateObj.getMinutes()

  return (
    <>
      <ul>
        <li>{dateObj.toLocaleString()}</li>
        <li>{time}</li>
      </ul>
    </>
  );
};
export default EventItem;
