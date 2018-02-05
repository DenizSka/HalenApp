import React, {Component} from "react";
import { NavLink, Route } from "react-router-dom";
import axios from 'axios';

export class PastEvents extends Component {
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
        console.log("events...", this.state.eventsData)
        let eventContainer =[];
        for (var event of this.state.eventsData){
         eventContainer.push(<div key={event.id}><span> <strong>Name: </strong>{event.displayName}</span><span> <strong>Type:</strong> {event.type}</span><span> <strong>Venue:</strong> {event.venue}</span><span>  <strong>Date:</strong> {event.dateEvent}</span><span> <strong>URL:</strong> {event.url}</span></div>)
        }
          return (
            <section className="past">
                <h1 className="pastmedium">Past Events List</h1>
                <div>
                {this.state.eventsDataLoaded ? (
            <div>
              {eventContainer}
            </div>) : (
              <p> Loading Events... </p>
          )}
                </div>

            </section>
          );
    }
}
