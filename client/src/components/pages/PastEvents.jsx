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
    // this.handleDelete = this.handleDelete.bind(this);
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



//   handleDelete(event) {
//     const data = {
//       id: event.id
//     }
//     console.log(data);
//     axios.delete(`/pastevents/`)
//     .then(res => res.json())
//           .then((data) => {
//             if(data === "success"){
//            this.setState({msg: "User has been deleted."});
//         }
//     }).catch(function(err) {
//         console.log(err)
//     });
// }



    render() {
          return (
            <div className="past">
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
                    <button className="button medium" onClick={this.handleDelete} > Remove From List </button>
                  </div>
                      ))}
                </div>) : (
                  <p> Loading Events... </p>
                )}
              </div>

            </div>
          );
    }
}


export default PastEvents;
