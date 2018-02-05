import React from 'react';


const MoreInfo = ({event, onAdd, onCancel}) => (
    <div className="eventItem" style={{backgroundColor: "white", border: 1, zIndex: 1000, position: 'absolute'}}>
    <h3>More info</h3>
      <div className= "singleEvent">
        <ul>
        <li><strong>Name:</strong> {event.displayName}</li>
        <li><strong>Type:</strong> {event.type}</li>
        <li><strong>Venue:</strong> {event.venue.displayName}</li>
        <li><strong>Date:</strong> {event.start.date}</li>
        <li><strong>Buy:</strong> <a className= "singleEvent" href={event.uri}>Click Here</a></li>
        </ul>
        <button className="button medium" onClick={onAdd}> Add to Past Events </button>
        <button className="button medium" onClick={onCancel}> Cancel </button>
        </div>
  </div>
);

export default MoreInfo;
