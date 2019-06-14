import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';

const Events = () => {
  const [events, setEvents] = useState(true);

  const getEvents = () => {
    fetch('/events', {
      method: 'GET',
    })
      .then(response => {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        const newEvents = [];
        myJson.forEach(event => {
          const newEvent = [event.start, event.duration];
          newEvents.push(newEvent);
        });
        setEvents(newEvents);
      });
  };

  useEffect(() => {
    
    if(!Array.isArray(events)) getEvents();
  });

  const eventArr = [];

  if (typeof events !== 'boolean' && events) {
    events.forEach((event, i) => {
      const newItem = <EventItem start={event[0]} duration={event[1]} key={`e${i}`} />;
      eventArr.push(newItem);
    });
  }

  return (
    <div id="eventsList">
      Events:
      {eventArr}
    </div>
  );
};

export default Events;
