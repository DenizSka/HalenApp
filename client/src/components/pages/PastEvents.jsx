import React, {Component} from "react";
import { NavLink, Route } from "react-router-dom";
import axios from 'axios';

class PastEvents extends Component {
    constructor(props) {
    super(props)
    this.state = {
      eventsData:[],
      eventsDataLoaded: false,
    };
  }

     componentDidMount() {
      axios.get(`/pastevents`)
        .then((res) => {
          console.log('pastevents', res.data.events)
          this.setState({
            eventsData: res.data.events,
            eventsDataLoaded: true,
          });
        })
        .catch(err => console.log(err));
    }

    render() {
        console.log("events inside pastevents", this.state.eventsData)
        // let eventContainer =[];
        // for (const event in this.state.eventsData){
        //   console.log('event container', event);
        //  eventContainer.push(<div><span> <strong>Name: </strong>{event.displayName}</span><span> <strong>Type:</strong> {event.type}</span><span> <strong>Venue:</strong> {event.venue}</span><span>  <strong>Date:</strong> {event.dateEvent}</span><span> <strong>URL:</strong> {event.url}</span></div>)

        // }
          return (
            <section className="past">
                <h1 className="pastmedium">Past Events List</h1>
                <div>
                {this.state.eventsDataLoaded ? (
            <div>
                  {this.state.eventsData.map(event => (
              <div key={event.id}>
              <h1>  Name: {event.displayname} </h1>
              <p>  Type: {event.type} </p>
              <p>  Venue: {event.venue} </p>
              <p>  Date: {event.dateevent} </p>
              <p>  URL: <a className= "singleEvent" href={event.url}> See Event Page </a> </p>
            </div>
                ))}
            </div>) : (
              <p> Loading Events... </p>
          )}
                </div>

            </section>
          );
    }
}


export default PastEvents;
