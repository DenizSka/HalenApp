import React, {Component} from "react";
import { NavLink } from "react-router-dom";
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
          return (
            <section className="past">
              <h1 className="pastmedium">Past Events List</h1>
              <div>
                {this.state.eventsDataLoaded ? (
                <div className="pastmedium">
                  {this.state.eventsData.map(event => (
                  <div key={event.id}>
                    <h1> Name: {event.displayname} </h1>
                    <p>  Type: {event.type} </p>
                    <p>  Venue: {event.venue} </p>
                    <p>  Date: {event.dateevent} </p>
                    <p>  URL: <a className= "singleEvent" href={event.uri}> See Event Page </a> </p>
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
